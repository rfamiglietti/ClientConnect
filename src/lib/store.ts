

// Helpers
const uid = () => Math.random().toString(36).substring(2, 9);
const nowISO = () => new Date().toISOString();

// Tipos
type LeadStatus = "novo" | "contato" | "qualificado" | "perdido";

interface Lead {
  id: string;
  nome: string;
  empresa?: string;
  email?: string;
  telefone?: string;
  origem?: string;
  status: LeadStatus;
  criadoEm: string;
  atualizadoEm: string;
  responsavelId?: string;
  notas?: string;
}

interface Interacao {
  id: string;
  data: string;
  tipo: "email" | "chamada" | "reunião";
  descricao: string;
  leadId?: string;
}

interface Tarefa {
  id: string;
  titulo: string;
  concluida: boolean;
  prazo?: string;
  leadId?: string;
}

interface Cliente {
  id: string;
  nome: string;
  empresa?: string;
  email?: string;
  telefone?: string;
  criadoEm: string;
}

interface Usuario {
  id: string;
  nome: string;
  email: string;
  role: "gerente" | "vendedor";
}

interface CRMState {
  usuario?: Usuario;
  usuarios: Usuario[];
  leads: Lead[];
  interacoes: Interacao[];
  tarefas: Tarefa[];
  clientes: Cliente[];
  // Leads
  addLead: (p: Partial<Lead>) => Lead;
  updateLead: (id: string, patch: Partial<Lead>) => void;
  removeLead: (id: string) => void;
  // Interações
  addInteracao: (p: Partial<Interacao>) => Interacao;
  removeInteracao: (id: string) => void;
  // Tarefas
  addTarefa: (p: Partial<Tarefa>) => Tarefa;
  toggleTarefa: (id: string) => void;
  removeTarefa: (id: string) => void;
  // Clientes
  addCliente: (p: Partial<Cliente>) => Cliente;
  removeCliente: (id: string) => void;
  // Login
  login: (email: string) => void;
  logout: () => void;
}

// Store
export const useCRM = create<CRMState>()(
  persist(
    (set, get) => ({
      usuario: undefined,
      usuarios: [
        {
          id: "u1",
          nome: "Marlon Gerente",
          email: "gerente@cliente.com",
          role: "gerente",
        },
        {
          id: "u2",
          nome: "Vera Vendedora",
          email: "vendedora@cliente.com",
          role: "vendedor",
        },
      ],
      leads: [
        {
          id: "l1",
          nome: "Acme Ltda",
          empresa: "Acme",
          email: "contato@acme.com",
          status: "contato",
          criadoEm: nowISO(),
          atualizadoEm: nowISO(),
          responsavelId: "u2",
        },
      ],
      interacoes: [],
      tarefas: [],
      clientes: [],

      // Auth
      login: (email) =>
        set((s) => ({
          usuario: s.usuarios.find((u) => u.email === email),
        })),
      logout: () => set({ usuario: undefined }),

      // Leads
      addLead: (p) => {
        const lead: Lead = {
          id: uid(),
          nome: p.nome || "Novo Lead",
          empresa: p.empresa,
          email: p.email,
          telefone: p.telefone,
          origem: p.origem,
          status: (p.status || "novo") as LeadStatus,
          criadoEm: nowISO(),
          atualizadoEm: nowISO(),
          responsavelId: p.responsavelId,
          notas: p.notas,
        };
        set((s) => ({ leads: [lead, ...s.leads] }));
        return lead;
      },
      updateLead: (id, patch) =>
        set((s) => ({
          leads: s.leads.map((l) =>
            l.id === id ? { ...l, ...patch, atualizadoEm: nowISO() } : l
          ),
        })),
      removeLead: (id) =>
        set((s) => ({ leads: s.leads.filter((l) => l.id !== id) })),

      // Interações
      addInteracao: (p) => {
        const it: Interacao = { id: uid(), data: p.data || nowISO(), ...p } as Interacao;
        set((s) => ({ interacoes: [it, ...s.interacoes] }));
        return it;
      },
      removeInteracao: (id) =>
        set((s) => ({ interacoes: s.interacoes.filter((i) => i.id !== id) })),

      // Tarefas
      addTarefa: (p) => {
        const t: Tarefa = {
          id: uid(),
          titulo: p.titulo || "Nova Tarefa",
          concluida: p.concluida ?? false,
          prazo: p.prazo,
          leadId: p.leadId,
        };
        set((s) => ({ tarefas: [t, ...s.tarefas] }));
        return t;
      },
      toggleTarefa: (id) =>
        set((s) => ({
          tarefas: s.tarefas.map((t) =>
            t.id === id ? { ...t, concluida: !t.concluida } : t
          ),
        })),
      removeTarefa: (id) =>
        set((s) => ({ tarefas: s.tarefas.filter((t) => t.id !== id) })),

      // Clientes
      addCliente: (p) => {
        const c: Cliente = { id: uid(), criadoEm: nowISO(), ...p } as Cliente;
        set((s) => ({ clientes: [c, ...s.clientes] }));
        return c;
      },
      removeCliente: (id) =>
        set((s) => ({ clientes: s.clientes.filter((c) => c.id !== id) })),
    }),
    { name: "clientconnect" }
  )
);
