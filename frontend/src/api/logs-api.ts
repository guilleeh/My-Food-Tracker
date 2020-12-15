import Axios from 'axios'

export const uploadFile = async (uploadUrl: string, file: Buffer): Promise<void> => {
  await Axios.put(uploadUrl, file)
}