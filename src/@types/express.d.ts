
// Realiza um merge na interface desejada (unindo o que tem atualmente no Request e adicionando novas propriedades declaradas aqui)

// OBS: ao adicionar essa nova propriedade o typescript já o reconhece, porém, o ts-node não consegue, então deve ser adicionado uma flag --files no script que roda o projeto

declare namespace Express {
    export interface Request {
        userId: string;
    }
}