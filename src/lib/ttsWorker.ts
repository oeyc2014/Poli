/* ============================================================
   Poli TTS worker — Kokoro neural voice, off the main thread.
   Loaded via `new URL('./ttsWorker.ts', import.meta.url)` so Vite
   bundles kokoro-js + transformers.js into a real worker chunk.
   The package's default export resolves to the Node build; Vite aliases
   its fs/path imports to no-op shims so the Hugging Face voice fetch
   branch runs in the browser instead.
   ============================================================ */
import { KokoroTTS } from 'kokoro-js'

let tts: KokoroTTS | null = null
let loading: Promise<KokoroTTS> | null = null

function post(msg: unknown): void {
  self.postMessage(msg)
}

async function ensureModel(): Promise<KokoroTTS> {
  if (tts) return tts
  if (!loading) {
    loading = KokoroTTS.from_pretrained('onnx-community/Kokoro-82M-v1.0-ONNX', {
      dtype: 'q8',
      device: 'wasm',
    }).then((m: KokoroTTS) => {
      tts = m
      post({ type: 'ready' })
      return m
    })
    loading.catch((e: unknown) => {
      post({ type: 'error', message: String(e) })
      loading = null
    })
  }
  return loading
}

self.addEventListener('message', (ev: MessageEvent) => {
  void (async () => {
    const { id, text, voice, speed } = ev.data as { id: number; text: string; voice?: string; speed?: number }
    try {
      const model = await ensureModel()
      const audio = await model.generate(text, { voice: (voice ?? 'af_heart') as never, speed: speed ?? 0.94 })
      const blob = audio.toBlob()
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const fr = new FileReader()
        fr.onload = () => resolve(String(fr.result))
        fr.onerror = () => reject(fr.error)
        fr.readAsDataURL(blob)
      })
      post({ type: 'clip', id, dataUrl })
    } catch {
      post({ type: 'clip', id, dataUrl: null })
    }
  })()
})
