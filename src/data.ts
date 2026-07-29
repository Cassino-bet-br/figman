export type NavItem = {
  id: string;
  label: string;
  icon: string;
  section?: string;
};

export const NAV: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard", section: "principal" },
  { id: "projetos", label: "Projetos", icon: "FolderKanban", section: "principal" },
  { id: "producao", label: "Produção", icon: "Hammer", section: "principal" },
  { id: "estoque", label: "Estoque & Compras", icon: "Package", section: "gestão" },
  { id: "financeiro", label: "Financeiro", icon: "TrendingUp", section: "gestão" },
  { id: "agenda", label: "Agenda", icon: "CalendarDays", section: "gestão" },
  { id: "medicao", label: "Medição Técnica", icon: "Ruler", section: "gestão" },
  { id: "portal", label: "Portal do Cliente", icon: "UserCircle", section: "clientes" },
  { id: "equipe", label: "Equipe", icon: "Users", section: "clientes" },
];

export const MATERIAIS = [
  { id: "M001", nome: "Chapa MDF 15mm Branco", categoria: "Chapas", atual: 48, reservado: 22, disponivel: 26, em_compra: 0, minimo: 20, custo: 87.50, fornecedor: "Arauco Brasil", localizacao: "A-01" },
  { id: "M002", nome: "Chapa MDF 18mm Grafite", categoria: "Chapas", atual: 12, reservado: 18, disponivel: -6, em_compra: 30, minimo: 15, custo: 112.00, fornecedor: "Arauco Brasil", localizacao: "A-02" },
  { id: "M003", nome: "Corrediça Telescópica 450mm", categoria: "Ferragens", atual: 145, reservado: 60, disponivel: 85, em_compra: 0, minimo: 80, custo: 28.90, fornecedor: "Hettich Brasil", localizacao: "B-04" },
  { id: "M004", nome: "Dobradiça Soft-Close 110°", categoria: "Ferragens", atual: 38, reservado: 72, disponivel: -34, em_compra: 100, minimo: 50, custo: 14.20, fornecedor: "Hettich Brasil", localizacao: "B-05" },
  { id: "M005", nome: "Puxador Cilidro Escovado 128mm", categoria: "Puxadores", atual: 67, reservado: 44, disponivel: 23, em_compra: 0, minimo: 30, custo: 32.00, fornecedor: "Arpex", localizacao: "C-01" },
  { id: "M006", nome: "Fita de Borda PVC 22mm Branco", categoria: "Fitas", atual: 3200, reservado: 1800, disponivel: 1400, em_compra: 0, minimo: 1000, custo: 0.18, fornecedor: "Rehau", localizacao: "D-01" },
  { id: "M007", nome: "Tinta UV Branco Fosco 1L", categoria: "Tintas", atual: 8, reservado: 14, disponivel: -6, em_compra: 20, minimo: 10, custo: 145.00, fornecedor: "Sayerlack", localizacao: "E-02" },
  { id: "M008", nome: "Vidro Temperado 4mm Fumê", categoria: "Vidros", atual: 22, reservado: 8, disponivel: 14, em_compra: 0, minimo: 5, custo: 95.00, fornecedor: "Cebrace", localizacao: "F-01" },
  { id: "M009", nome: "Parafuso Confirmat 7x70mm (cx100)", categoria: "Consumíveis", atual: 6, reservado: 3, disponivel: 3, em_compra: 0, minimo: 5, custo: 28.00, fornecedor: "Torxfer", localizacao: "G-03" },
  { id: "M010", nome: "Chapa OSB 18mm", categoria: "Chapas", atual: 5, reservado: 12, disponivel: -7, em_compra: 20, minimo: 8, custo: 78.00, fornecedor: "Eucatex", localizacao: "A-05" },
];

export const ORDENS_COMPRA = [
  {
    fornecedor: "Arauco Brasil",
    itens: [
      { material: "Chapa MDF 18mm Grafite", qtd: 30, custo: 112.00 },
    ],
    total: 3360.00,
    urgente: true,
  },
  {
    fornecedor: "Hettich Brasil",
    itens: [
      { material: "Dobradiça Soft-Close 110°", qtd: 100, custo: 14.20 },
    ],
    total: 1420.00,
    urgente: true,
  },
  {
    fornecedor: "Sayerlack",
    itens: [
      { material: "Tinta UV Branco Fosco 1L", qtd: 20, custo: 145.00 },
    ],
    total: 2900.00,
    urgente: false,
  },
  {
    fornecedor: "Eucatex",
    itens: [
      { material: "Chapa OSB 18mm", qtd: 20, custo: 78.00 },
    ],
    total: 1560.00,
    urgente: false,
  },
];

export const PROJETOS_FINANCEIRO = [
  { id: "P-2024-041", cliente: "Família Rodrigues", valor: 38500, entrada: 19250, parcelas_rest: 2, custo_mat: 12400, mao_obra: 4200, transporte: 380, comissao: 1925, retrabalho: 0, lucro: 6345, margem: 16.5 },
  { id: "P-2024-042", cliente: "Studio AG Arquitetura", valor: 72000, entrada: 36000, parcelas_rest: 3, custo_mat: 24800, mao_obra: 7600, transporte: 620, comissao: 3600, retrabalho: 850, lucro: 18530, margem: 25.7 },
  { id: "P-2024-043", cliente: "Construtora Verano", valor: 156000, entrada: 52000, parcelas_rest: 4, custo_mat: 61200, mao_obra: 18400, transporte: 1800, comissao: 7800, retrabalho: 2100, lucro: 12700, margem: 8.1 },
  { id: "P-2024-044", cliente: "Dr. Marcos Leite", valor: 28900, entrada: 14450, parcelas_rest: 1, custo_mat: 9800, mao_obra: 3100, transporte: 290, comissao: 1445, retrabalho: 0, lucro: 10715, margem: 37.1 },
  { id: "P-2024-045", cliente: "Boutique Íris", valor: 44200, entrada: 22100, parcelas_rest: 2, custo_mat: 15600, mao_obra: 5200, transporte: 420, comissao: 2210, retrabalho: 600, lucro: 9970, margem: 22.6 },
];

export const GRAFICO_RECEITAS = [
  { mes: "Fev", receita: 118000, despesa: 82000 },
  { mes: "Mar", receita: 134000, despesa: 91000 },
  { mes: "Abr", receita: 97000, despesa: 78000 },
  { mes: "Mai", receita: 162000, despesa: 104000 },
  { mes: "Jun", receita: 143000, despesa: 98000 },
  { mes: "Jul", receita: 189000, despesa: 118000 },
];

export const CONTAS_PAGAR = [
  { desc: "Arauco Brasil — MDF", venc: "2024-07-30", valor: 3360, status: "pendente" },
  { desc: "Hettich Brasil — Ferragens", venc: "2024-07-30", valor: 1420, status: "pendente" },
  { desc: "Aluguel Galpão", venc: "2024-08-05", valor: 8200, status: "agendado" },
  { desc: "Folha Equipe Jul", venc: "2024-08-05", valor: 18400, status: "agendado" },
  { desc: "Sayerlack — Tintas", venc: "2024-08-10", valor: 2900, status: "pendente" },
];

export const CONTAS_RECEBER = [
  { desc: "P-2024-041 — Família Rodrigues (2ª parcela)", venc: "2024-07-28", valor: 9625, status: "vencendo" },
  { desc: "P-2024-042 — Studio AG (2ª parcela)", venc: "2024-08-02", valor: 12000, status: "pendente" },
  { desc: "P-2024-043 — Verano (2ª parcela)", venc: "2024-08-15", valor: 26000, status: "pendente" },
  { desc: "P-2024-044 — Dr. Marcos (final)", venc: "2024-08-20", valor: 14450, status: "pendente" },
  { desc: "P-2024-045 — Boutique Íris (2ª parcela)", venc: "2024-09-01", valor: 11050, status: "pendente" },
];

export const EVENTOS_AGENDA = [
  { id: 1, data: "2024-07-28", hora: "09:00", tipo: "medicao", titulo: "Medição — Residência Costa", local: "Rua das Garças, 240", resp: "Carlos M." },
  { id: 2, data: "2024-07-28", hora: "14:00", tipo: "visita", titulo: "Visita — Dr. Figueiredo", local: "Al. Santos, 1820", resp: "Ana P." },
  { id: 3, data: "2024-07-29", hora: "08:00", tipo: "entrega", titulo: "Entrega P-2024-041 (parcial)", local: "Rua Ipê, 88", resp: "Logística" },
  { id: 4, data: "2024-07-30", hora: "10:00", tipo: "aprovacao", titulo: "Aprovação projeto — Boutique Íris", local: "Online", resp: "Ana P." },
  { id: 5, data: "2024-07-31", hora: "08:00", tipo: "montagem", titulo: "Montagem P-2024-044 (dia 1)", local: "Clínica Dr. Marcos, sala 4", resp: "Equipe B" },
  { id: 6, data: "2024-08-01", hora: "08:00", tipo: "montagem", titulo: "Montagem P-2024-044 (dia 2)", local: "Clínica Dr. Marcos, sala 4", resp: "Equipe B" },
  { id: 7, data: "2024-08-02", hora: "14:00", tipo: "assistencia", titulo: "Assistência — P-2024-038", local: "Av. Paulista, 900", resp: "Carlos M." },
  { id: 8, data: "2024-08-05", hora: "09:00", tipo: "medicao", titulo: "Medição — Apartamento Pinheiros", local: "Rua Teodoro Sampaio, 340", resp: "Carlos M." },
  { id: 9, data: "2024-08-07", hora: "08:00", tipo: "entrega", titulo: "Entrega P-2024-042 (completa)", local: "Studio AG, Itaim", resp: "Logística" },
];

export const MEDICAO_CHECKLIST = [
  { id: "m1", item: "Paredes — largura total", obs: "", ok: true },
  { id: "m2", item: "Paredes — irregularidades / fora de prumo", obs: "parede sul: +4mm no centro", ok: false },
  { id: "m3", item: "Pé-direito (mínimo / máximo)", obs: "2,78m min / 2,82m max", ok: true },
  { id: "m4", item: "Portas e janelas — posição e recorte", obs: "", ok: true },
  { id: "m5", item: "Rodapé — altura e recuo", obs: "rodapé 15cm, sem recuo", ok: true },
  { id: "m6", item: "Pilares / colunas interferentes", obs: "nenhum", ok: true },
  { id: "m7", item: "Pontos elétricos — tomadas e interruptores", obs: "3 tomadas, 1 ponto de luz", ok: true },
  { id: "m8", item: "Pontos hidráulicos (cozinha / banheiro)", obs: "N/A — escritório", ok: true },
  { id: "m9", item: "Nível do piso — desnível registrado", obs: "nível ok", ok: true },
  { id: "m10", item: "Fotos e vídeos enviados ao sistema", obs: "12 fotos, 1 vídeo", ok: true },
];

export const PORTAL_ETAPAS = [
  { id: 1, label: "Medição", concluido: true, data: "12 Jul" },
  { id: 2, label: "Projeto 3D", concluido: true, data: "18 Jul" },
  { id: 3, label: "Aprovação", concluido: true, data: "20 Jul" },
  { id: 4, label: "Produção", concluido: false, data: "Em andamento", atual: true },
  { id: 5, label: "Pintura", concluido: false, data: "Prev. 05 Ago" },
  { id: 6, label: "Entrega", concluido: false, data: "Prev. 10 Ago" },
  { id: 7, label: "Montagem", concluido: false, data: "Prev. 12 Ago" },
  { id: 8, label: "Vistoria", concluido: false, data: "Prev. 14 Ago" },
];

export const PORTAL_PAGAMENTOS = [
  { desc: "Entrada (50%)", valor: 19250, data: "15 Jul", status: "pago" },
  { desc: "2ª parcela (25%)", valor: 9625, data: "28 Jul", status: "vencendo" },
  { desc: "Final (25%)", valor: 9625, data: "14 Ago", status: "pendente" },
];
