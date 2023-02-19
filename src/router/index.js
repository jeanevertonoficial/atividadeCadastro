import {createRouter, createWebHashHistory} from 'vue-router';
import caminhoGlobal from "@/router/caminho-global";

const routes = [
    {
        path: `${new caminhoGlobal().index}`,
        name: 'formulario',
        component: () => import('../views/formulario-ps-fisica'),
        children: [
            {
                path: `${new caminhoGlobal().index}:id`,
                name: 'index_id',
                prosp: true,
                component: () => import('../views/formulario-ps-fisica'),
            },
            {
                path: `${new caminhoGlobal().index}editar-dados/pessoa-fisica/:id`,
                name: 'index_idEdita',
                prosp: true,
                component: () => import('../views/formulario-ps-fisica'),
            }
        ]
    },
    {
        path: `${new caminhoGlobal().index_juridico}`,
        name: 'FomularioPsJuridica',
        component: () => import('../views/fomulario-ps-juridica'),
        children: [
            {
                path: `${new caminhoGlobal().index_juridico}/:id`,
                name: 'PsJuridica_id',
                prosp: true,
                component: () => import('../views/fomulario-ps-juridica'),
            },
            {
                path: `${new caminhoGlobal().index_juridico}editar-dados/pessoa-juridica/:id`,
                name: 'PsJuridica_idEdita',
                prosp: true,
                component: () => import('../views/fomulario-ps-juridica'),
            }
        ]
    },
    {
        path: `${new caminhoGlobal().endereco}`,
        name: 'endereco',
        component: () => import('../views/endereco.vue'),
        children: [
            {
                path: `${new caminhoGlobal().endereco}/editar-dados/:id`,
                name: 'endereco_idEdita',
                prosp: true,
                component: () => import('../views/endereco.vue')
            },
            {
                path: `${new caminhoGlobal().endereco}/:id`,
                name: 'endereco_id',
                prosp: true,
                component: () => import('../views/endereco.vue')
            }
        ]
    },
    {
        path: `${new caminhoGlobal().codigo}`,
        name: 'codigo',
        component: () => import('../views/codigo-auth.vue'),
        children: [
            {
                path: `${new caminhoGlobal().codigo}/:id`,
                name: 'codigo_id',
                prosp: true,
                component: () => import('../views/codigo-auth.vue')
            }
        ]
    },
    {
        path: `${new caminhoGlobal().documentos}`,
        name: 'anxarDocumentos',
        component: () => import('../views/anexar-documentos'),
        children: [
            {
                path: `${new caminhoGlobal().documentos}/:id`,
                name: 'documentos_id',
                prosp: true,
                component: () => import('../views/anexar-documentos')
            },
            {
                path: `${new caminhoGlobal().documentos}/editar-dados/:id`,
                name: 'documentos_idEdita',
                prosp: true,
                component: () => import('../views/anexar-documentos')
            }
        ]
    },
    {
        path: `${new caminhoGlobal().rota_erro_404}`,
        name: 'NaoExiste',
        component: () => import('../views/rota-nao-existe'),
        children: [
            {
                path: `${new caminhoGlobal().index_error}/:pathMatch(.*)*/`,
                name: 'NaoExiste',
                component: () => import('../views/rota-nao-existe'),
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes: routes
})

export default router
