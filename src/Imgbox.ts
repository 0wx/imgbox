import axios from 'axios'
import { AxiosInstance } from 'axios'
import FormData from 'form-data'

interface FinalResult {
  ok: boolean
  message?: string
  gellery_edit?: string
  files?: any[]
}
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
class Imgbox {
  token!: {
    token_id: number
    token_secret: string
    gallery_id: string
    gallery_secret: string
  }
  client: AxiosInstance
  csrf!: string
  cookie!: string
  config!: {
    headers: {
      'X-CSRF-Token': string
      Cookie: string
    }
  }
  constructor() {
    this.client = axios.create({ baseURL: 'https://imgbox.com' })
  }

  setConfig = (csrf: string, cookie: string): void => {
    this.csrf = csrf
    this.cookie = cookie
  }

  getToken = async (): Promise<void> => {
    const data = {
      gallery: true,
      gallery_title: '',
      comments_enabled: 0,
    }
    const config = {
      headers: {
        'X-CSRF-Token': this.csrf,
        Cookie: this.cookie,
      },
    }

    this.config = config
    const response = await this.client.post(
      '/ajax/token/generate',
      data,
      config
    )
    const result = response.data as Token
    if (!result.ok) throw new Error(result.message)
    const { token_id, token_secret, gallery_id, gallery_secret } = result
    this.token = { token_id, token_secret, gallery_id, gallery_secret }
  }

  getAuthenticityToken = async (): Promise<void> => {
    const response = await this.client.get('/')
    const csrf = response.data
      .split('input name="authenticity_token" type="hidden" value="')[1]
      .split('"')[0]
    const cookie =
      response.headers['set-cookie'][1].split(';')[0] + '; request_method=POST'
    this.setConfig(csrf, cookie)
  }

  upload = async (images: Images[]): Promise<FinalResult> => {
    const form = new FormData()

    form.append('token_id', this.token.token_id)
    form.append('token_secret', this.token.token_secret)
    form.append('content_type', 2)
    form.append('thumbnail_size', '100c')
    form.append('gallery_id', this.token.gallery_id)
    form.append('gallery_secret', this.token.gallery_secret)
    form.append('comments_enabled', 0)

    for (const image of images) {
      form.append('files[]', image.buffer, image.filename)
    }

    const config = {
      headers: {
        ...form.getHeaders(),
        ...this.config.headers,
        'User-Agent':
          'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0',
        'X-Requested-With': 'XMLHttpRequest',
        Origin: 'https://imgbox.com',
        Accept: 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        DNT: 1,
        Connection: 'keep-alive',
        Referer: 'https://imgbox.com/',
        'Sec-GPC': 1,
      },
    }
    try {
      const { data } = await this.client.post('/upload/process', form, config)
      const result = {
        ok: true,
        gallery_edit: `https://imgbox.com/gallery/edit/${this.token.gallery_id}/${this.token.gallery_secret}`,
        ...data,
      }
      return result
    } catch (error) {
      console.error(error)
      return {
        ok: false,
        message: error.message,
      }
    }
  }

  // IDK what kind of type definition I had to fill in this function
  // Dear future me forgive meeee :'<
  init = async (): Promise<Function> => {
    await this.getAuthenticityToken()
    await this.getToken()
    return this.upload
  }
}

export default Imgbox
