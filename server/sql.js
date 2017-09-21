drop table usuario

CREATE TABLE usuario (
    usuario_id serial NOT NULL ,
    nome text NOT NULL,
    senha text NOT NULL,
    tipo smallint NOT NULL,
    situacao smallint NOT NULL,
    criacao timestamp NULL DEFAULT now(),
    CONSTRAINT usuario_id PRIMARY KEY (usuario_id)
);
COMMENT ON table   usuario 				IS 'cadastro de usuário';
COMMENT ON column  usuario.usuario_id 	IS 'código do usuario';
COMMENT ON column  usuario.nome 		IS 'nome do usuario' ;
COMMENT ON column  usuario.senha 		IS 'senha do usuario';
COMMENT ON column  usuario.situacao 	IS 'situação do usuario: 1 - Ativo, 2 - Aguardando confirmação, 3 - Aguardando troca de senha, 4 - Migrado';
COMMENT ON column  usuario.tipo 		IS 'tipo do usuario: 1 - usuario comum, 2 - usuário premium, 99 - administrador';

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    drop table usuario_detalhamento;



CREATE TABLE usuario_detalhamento (
    usuario_id integer REFERENCES usuario ON DELETE RESTRICT NOT NULL,
    indicador_pj BOOLEAN NOT null ,
    email TEXT NOT NULL unique,
    cpf_cnpj varchar(15) NOT null unique,
    foto bytea NULL,
    criacao timestamp NULL DEFAULT now(),
    CONSTRAINT usuario_detalhamento_id PRIMARY KEY (usuario_id)
);
CREATE INDEX usuario_cpf_cnpj ON usuario_detalhamento (cpf_cnpj);
CREATE INDEX 	    usuario_email 	    ON  usuario_detalhamento (email);
COMMENT ON table   usuario_detalhamento 			  IS 'complemento do cadastro de usuário';
COMMENT ON column  usuario_detalhamento.usuario_id    IS 'código do usuário (usuario)';
COMMENT ON column  usuario_detalhamento.indicador_pj  IS 'indicador se é usuário PJ ' ;
COMMENT ON column  usuario_detalhamento.email 		  IS 'email do usuario';
COMMENT ON column  usuario_detalhamento.cpf_cnpj 	  IS  'cpf ou cnpj do usuário';
COMMENT ON column  usuario_detalhamento.foto 	      IS  'foto do usuario';

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    drop table usuario_acesso_externo;

CREATE TABLE usuario_acesso_externo (
    usuario_id integer REFERENCES usuario ON DELETE RESTRICT NOT NULL,
    tipo_login smallint NOT NULL,
    usuario_id_externo bigint NOT null ,
    criacao timestamp NULL DEFAULT now(),
    CONSTRAINT usuario_acesso_externo_id PRIMARY KEY (usuario_id, tipo_login)
);
CREATE INDEX 	   usuario_id_externo 	    ON  usuario_acesso_externo (usuario_id_externo);
COMMENT ON table   usuario_acesso_externo 			         IS 'vinculo do cadastro de usuário com outras formas de login';
COMMENT ON column  usuario_acesso_externo.usuario_id         IS 'código do usuário (usuario)';
COMMENT ON column  usuario_acesso_externo.tipo_login 	     IS 'Forma Login: 1 - facebook';
COMMENT ON column  usuario_acesso_externo.usuario_id_externo IS 'id do usuário no provedor externo';

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    CREATE TABLE empresa (
    cd_empresa serial NOT NULL  ,
    vigente    boolean NOT NULL default true ,
    nome       text NOT NULL  ,
    cnpj       varchar(15)  null ,
    dt_atualizacao timestamp DEFAULT now(),
    CONSTRAINT empresa_id PRIMARY KEY (cd_empresa)
);
COMMENT ON table   empresa 				IS 'dados de uma empresa';
COMMENT ON column  empresa.cd_empresa   IS 'código da empresa';
COMMENT ON column  empresa.vigente      IS 'indica se registro está vigente';
COMMENT ON column  empresa.nome         IS 'nome da empresa';
COMMENT ON column  empresa.cnpj         IS 'cnpj da empresa' ;

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------


    CREATE TABLE avaliacao (
    usuario_id int NOT NULL  ,
    cd_empresa int NOT NULL  ,
    data_avaliacao       date NOT NULL  ,
    aprovada       bool not null ,
    comentario       text  null ,
    dt_atualizacao timestamp DEFAULT now(),
    CONSTRAINT avaliacao_id PRIMARY KEY (usuario_id, cd_empresa, data_avaliacao)
);
COMMENT ON table   avaliacao 					IS 'avaliação de uma empresa';
COMMENT ON column  avaliacao.usuario_id   	  	IS 'usuário responsável pela avaliação';
COMMENT ON column  avaliacao.cd_empresa       	IS 'código da empresa';
COMMENT ON column  avaliacao.data_avaliacao   	IS 'data da avaliação';
COMMENT ON column  avaliacao.aprovada         	IS 'indicador se usuário aprovou a empresa' ;
COMMENT ON column  avaliacao.comentario       	IS 'comentários sobre  a empresa' ;