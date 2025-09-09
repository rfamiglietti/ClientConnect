export type ID = string


export type Usuario = {
id: ID
nome: string
email: string
role: 'vendedor' | 'gerente'
}


export type LeadStatus = 'novo' | 'contato' | 'qualificado' | 'proposta' | 'ganho' | 'perdido'


export type Lead = {
id: ID
nome: string
empresa?: string
email?: string
telefone?: string
origem?: string
status: LeadStatus
criadoEm: string
atualizadoEm: string
responsavelId?: ID
notas?: string
}


export type Interacao = {
id: ID
leadId: ID
tipo: 'chamada' | 'email' | 'reuniao'
titulo: string
descricao?: string
data: string
criadoPor: ID
}


export type Tarefa = {
id: ID
titulo: string
leadId?: ID
atribuidaPara: ID
data: string
concluida: boolean
}


export type Cliente = {
id: ID
razaoSocial: string
cnpj?: string
email?: string
telefone?: string
criadoEm: string
}