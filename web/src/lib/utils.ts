export const uid = () => crypto.randomUUID()
export const nowISO = () => new Date().toISOString()
export const dateBR = (iso: string) => new Date(iso).toLocaleString('pt-BR')