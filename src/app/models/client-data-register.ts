export interface ClientDataRegister {
  lineId: string,
  imageAvatar: string,
  idCard: number
}

export interface ClientDataRegisterResponse {
  id: number,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
  lineId: string,
  imageAvatar: string,
  idCard: number
}
