interface Token {
  ok: boolean
  token_id: number
  token_secret: string
  gallery_id: string
  gallery_secret: string
  message?: string
}

interface Images {
  filename: string
  buffer: Buffer
}

type Files =
  | string[]
  | string
  | Buffer[]
  | Buffer
  | Images[]
  | Images
  | ImagesURL[]
  | ImagesURL

interface Upload {
  code: number
  data: any[]
}

interface FinalResult {
  ok: boolean
  message?: string
  gellery_edit?: string
  files?: any[]
}

interface Images {
  filename: string
  buffer: Buffer
}