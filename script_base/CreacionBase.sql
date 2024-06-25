/*==============================================================*/
/* DBMS name:      ORACLE Version 12c                           */
/* Created on:     11/27/2023 8:21:28 PM                        */
/*==============================================================*/


alter table CARGO
   drop constraint FK_CARGO_CARGOCARG_CARGO;

alter table CARGO
   drop constraint FK_CARGO_DEPENDENC_DEPENDEN;

alter table CATPRODUCTO
   drop constraint FK_CATPRODU_CATPRODUC_CATPRODU;

alter table CONTACTO
   drop constraint FK_CONTACTO_CONTACTOP_PERSONA;

alter table CONTACTO
   drop constraint FK_CONTACTO_TIPOCONTA_TIPOCONT;

alter table DETALLEFACTURA
   drop constraint FK_DETALLEF_DETALLEFA_PRODUCTO;

alter table DETALLEFACTURA
   drop constraint FK_DETALLEF_FACTURADE_FACTURA;

alter table DIRECCION
   drop constraint FK_DIRECCIO_COMPONENE_COMPONEN;

alter table DIRECCION
   drop constraint FK_DIRECCIO_NOMENCLAT_NOMENCLA;

alter table DIRECCION
   drop constraint FK_DIRECCIO_PERSONADI_PERSONA;

alter table EMPLEADOCARGO
   drop constraint FK_EMPLEADO_CARGOEMPL_CARGO;

alter table EMPLEADOCARGO
   drop constraint FK_EMPLEADO_EMPLEADOC_EMPLEADO;

alter table FACTURA
   drop constraint FK_FACTURA_EMPLEADOF_EMPLEADO;

alter table FACTURA
   drop constraint FK_FACTURA_FACTURAFA_FACTURA;

alter table FACTURA
   drop constraint FK_FACTURA_FACTURATI_TIPOFACT;

alter table FACTURA
   drop constraint FK_FACTURA_PERSONAFA_PERSONA;

alter table HISTORICOPRECIO
   drop constraint FK_HISTORIC_PRODUCTOH_PRODUCTO;

alter table INVENTARIO
   drop constraint FK_INVENTAR_DETALLEFA_DETALLEF;

alter table INVENTARIO
   drop constraint FK_INVENTAR_INVENTARI_INVENTAR;

alter table INVENTARIO
   drop constraint FK_INVENTAR_PRODUCTOI_PRODUCTO;

alter table NOMENCLATURA
   drop constraint FK_NOMENCLA_COMPONENT_COMPONEN;

alter table PERSONA
   drop constraint FK_PERSONA_PERSONATI_TIPODOC;

alter table PERSONA
   drop constraint FK_PERSONA_PERSONATI_TIPOPERS;

alter table PRODUCTO
   drop constraint FK_PRODUCTO_CATPRODUC_CATPRODU;

drop index CARGOCARGO_FK;

drop index DEPENDENCIACARGO_FK;

drop table CARGO cascade constraints;

drop index CATPRODUCTOCATPRODUCTO_FK;

drop table CATPRODUCTO cascade constraints;

drop table COMPONENTEDIREC cascade constraints;

drop index CONTACTOPERSONA_FK;

drop index TIPOCONTACTOCONTACTO_FK;

drop table CONTACTO cascade constraints;

drop table DEPENDENCIA cascade constraints;

drop index DETALLEFACTURAPRODUCTO_FK;

drop index FACTURADETALLEFACTURA_FK;

drop table DETALLEFACTURA cascade constraints;

drop index RELATIONSHIP_26_FK;

drop index RELATIONSHIP_24_FK;

drop index PERSONADIRECCION_FK;

drop table DIRECCION cascade constraints;

drop table EMPLEADO cascade constraints;

drop index EMPLEADOCARGO_FK;

drop index EMPLEADOCARGO2_FK;

drop table EMPLEADOCARGO cascade constraints;

drop index EMPLEADOFACTURA_FK;

drop index FACTURAFACTURA_FK;

drop index FACTURATIPOFACTURA_FK;

drop index PERSONAFACTURA_FK;

drop table FACTURA cascade constraints;

drop index PRODUCTOHISTORICOPRECIO_FK;

drop table HISTORICOPRECIO cascade constraints;

drop index RELATIONSHIP_25_FK;

drop index DETALLEFACTURAINVENTARIO_FK;

drop index PRODUCTOINVENTARIO_FK;

drop table INVENTARIO cascade constraints;

drop index RELATIONSHIP_23_FK;

drop table NOMENCLATURA cascade constraints;

drop index PERSONATIPOPERSONA_FK;

drop index PERSONATIPODOC_FK;

drop table PERSONA cascade constraints;

drop index CATPRODUCTO_FK;

drop table PRODUCTO cascade constraints;

drop table TIPOCONTACTO cascade constraints;

drop table TIPODOC cascade constraints;

drop table TIPOFACTURA cascade constraints;

drop table TIPOPERSONA cascade constraints;

/*==============================================================*/
/* Table: CARGO                                                 */
/*==============================================================*/
create table CARGO (
   CODCARGO             VARCHAR2(5)           not null,
   CODDEPENDENCIAFK     VARCHAR2(5)           not null,
   CODCARGOREF          VARCHAR2(5),
   NOMCARGO             VARCHAR2(40)          not null,
   ESTADOCARGO          SMALLINT              not null,
   constraint PK_CARGO primary key (CODCARGO)
);

/*==============================================================*/
/* Index: DEPENDENCIACARGO_FK                                   */
/*==============================================================*/
create index DEPENDENCIACARGO_FK on CARGO (
   CODDEPENDENCIAFK ASC
);

/*==============================================================*/
/* Index: CARGOCARGO_FK                                         */
/*==============================================================*/
create index CARGOCARGO_FK on CARGO (
   CODCARGOREF ASC
);

/*==============================================================*/
/* Table: CATPRODUCTO                                           */
/*==============================================================*/
create table CATPRODUCTO (
   IDCATPRODUCTO        VARCHAR2(5)           not null,
   CATPRODUCTOREF       VARCHAR2(5),
   DESCATPRODUCTO       VARCHAR2(30)          not null,
   constraint PK_CATPRODUCTO primary key (IDCATPRODUCTO)
);

/*==============================================================*/
/* Index: CATPRODUCTOCATPRODUCTO_FK                             */
/*==============================================================*/
create index CATPRODUCTOCATPRODUCTO_FK on CATPRODUCTO (
   CATPRODUCTOREF ASC
);

/*==============================================================*/
/* Table: COMPONENTEDIREC                                       */
/*==============================================================*/
create table COMPONENTEDIREC (
   IDCOMPDIRECCION      NUMBER(2)             not null,
   DESCPOSICION         VARCHAR2(50)          not null,
   OBLIGATORIEDAD       SMALLINT              not null,
   constraint PK_COMPONENTEDIREC primary key (IDCOMPDIRECCION)
);

/*==============================================================*/
/* Table: CONTACTO                                              */
/*==============================================================*/
create table CONTACTO (
   CONSECCONTACTO       NUMBER(4,0)           not null,
   IDTIPOCONTACTOFK     VARCHAR2(2)           not null,
   DESCTIPOCONTACTOFK   VARCHAR2(30)          not null,
   IDTIPOPERSONAFK      VARCHAR2(2)           not null,
   IDTIPODOCFK          VARCHAR2(3)           not null,
   NDOCUMENTOFK         VARCHAR2(12)          not null,
   DESCCONTACTO         VARCHAR2(40)          not null,
   constraint PK_CONTACTO primary key (CONSECCONTACTO)
);

/*==============================================================*/
/* Index: TIPOCONTACTOCONTACTO_FK                               */
/*==============================================================*/
create index TIPOCONTACTOCONTACTO_FK on CONTACTO (
   IDTIPOCONTACTOFK ASC,
   DESCTIPOCONTACTOFK ASC
);

/*==============================================================*/
/* Index: CONTACTOPERSONA_FK                                    */
/*==============================================================*/
create index CONTACTOPERSONA_FK on CONTACTO (
   IDTIPOPERSONAFK ASC,
   IDTIPODOCFK ASC,
   NDOCUMENTOFK ASC
);

/*==============================================================*/
/* Table: DEPENDENCIA                                           */
/*==============================================================*/
create table DEPENDENCIA (
   CODDEPENDENCIA       VARCHAR2(5)           not null,
   NOMDEPENDENCIA       VARCHAR2(30)          not null,
   ESTADODEPEN          SMALLINT              not null,
   constraint PK_DEPENDENCIA primary key (CODDEPENDENCIA)
);

/*==============================================================*/
/* Table: DETALLEFACTURA                                        */
/*==============================================================*/
create table DETALLEFACTURA (
   IDTIPOFACFK          VARCHAR2(3)           not null,
   NFACTURAFK           VARCHAR2(5)           not null,
   IDDETALLEFACTURA     VARCHAR2(5)           not null,
   ITEM                 NUMBER(3,0)           not null,
   IDCATPRODUCTOFK      VARCHAR2(5)           not null,
   REFPRODUCTOFK        VARCHAR2(5)           not null,
   CANTIDAD             NUMBER(3,0)           not null,
   PRECIO               NUMBER(12,2)          not null,
   constraint PK_DETALLEFACTURA primary key (IDTIPOFACFK, NFACTURAFK, IDDETALLEFACTURA)
);

/*==============================================================*/
/* Index: FACTURADETALLEFACTURA_FK                              */
/*==============================================================*/
create index FACTURADETALLEFACTURA_FK on DETALLEFACTURA (
   IDTIPOFACFK ASC,
   NFACTURAFK ASC
);

/*==============================================================*/
/* Index: DETALLEFACTURAPRODUCTO_FK                             */
/*==============================================================*/
create index DETALLEFACTURAPRODUCTO_FK on DETALLEFACTURA (
   IDCATPRODUCTOFK ASC,
   REFPRODUCTOFK ASC
);

/*==============================================================*/
/* Table: DIRECCION                                             */
/*==============================================================*/
create table DIRECCION (
   IDDIRECCION          NUMBER(3,0)           not null,
   POSICION             NUMBER(2)             not null,
   IDTIPOPERSONAFK      VARCHAR2(2)           not null,
   IDTIPODOCFK          VARCHAR2(3)           not null,
   NDOCUMENTOFK         VARCHAR2(12)          not null,
   VALORDIREC           VARCHAR2(15),
   IDNOMENFK            VARCHAR2(6),
   constraint PK_DIRECCION primary key (IDDIRECCION, POSICION)
);

/*==============================================================*/
/* Index: PERSONADIRECCION_FK                                   */
/*==============================================================*/
create index PERSONADIRECCION_FK on DIRECCION (
   IDTIPOPERSONAFK ASC,
   IDTIPODOCFK ASC,
   NDOCUMENTOFK ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_24_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_24_FK on DIRECCION (
   IDNOMENFK ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_26_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_26_FK on DIRECCION (
   POSICION ASC
);

/*==============================================================*/
/* Table: EMPLEADO                                              */
/*==============================================================*/
create table EMPLEADO (
   CODEMPLEADO          VARCHAR2(5)           not null,
   NOMEMPLEADO          VARCHAR2(30)          not null,
   APELLEMPLEADO        VARCHAR2(30)          not null,
   CORREO               VARCHAR2(50)          not null,
   constraint PK_EMPLEADO primary key (CODEMPLEADO)
);

/*==============================================================*/
/* Table: EMPLEADOCARGO                                         */
/*==============================================================*/
create table EMPLEADOCARGO (
   IDEMPLEADOCARGO      VARCHAR2(5)           not null,
   CODCARGOFK           VARCHAR2(5)           not null,
   CODEMPLEADOFK        VARCHAR2(5)           not null,
   constraint PK_EMPLEADOCARGO primary key (IDEMPLEADOCARGO)
);

/*==============================================================*/
/* Index: EMPLEADOCARGO2_FK                                     */
/*==============================================================*/
create index EMPLEADOCARGO2_FK on EMPLEADOCARGO (
   CODEMPLEADOFK ASC
);

/*==============================================================*/
/* Index: EMPLEADOCARGO_FK                                      */
/*==============================================================*/
create index EMPLEADOCARGO_FK on EMPLEADOCARGO (
   CODCARGOFK ASC
);

/*==============================================================*/
/* Table: FACTURA                                               */
/*==============================================================*/
create table FACTURA (
   IDTIPOFACFK          VARCHAR2(3)           not null,
   NFACTURA             VARCHAR2(5)           not null,
   IDTIPOPERSONAFK      VARCHAR2(2)           not null,
   IDTIPODOCFK          VARCHAR2(3)           not null,
   NDOCUMENTOFK         VARCHAR2(12)          not null,
   TIPOFACREF           VARCHAR2(3),
   NFACTURAREF          VARCHAR2(5),
   CODEMPLEADOFK        VARCHAR2(5)           not null,
   FECHAFACTURA         DATE                  not null,
   TOTALFACTURA         NUMBER(10,2),
   constraint PK_FACTURA primary key (IDTIPOFACFK, NFACTURA)
);

/*==============================================================*/
/* Index: PERSONAFACTURA_FK                                     */
/*==============================================================*/
create index PERSONAFACTURA_FK on FACTURA (
   IDTIPOPERSONAFK ASC,
   IDTIPODOCFK ASC,
   NDOCUMENTOFK ASC
);

/*==============================================================*/
/* Index: FACTURATIPOFACTURA_FK                                 */
/*==============================================================*/
create index FACTURATIPOFACTURA_FK on FACTURA (
   IDTIPOFACFK ASC
);

/*==============================================================*/
/* Index: FACTURAFACTURA_FK                                     */
/*==============================================================*/
create index FACTURAFACTURA_FK on FACTURA (
   TIPOFACREF ASC,
   NFACTURAREF ASC
);

/*==============================================================*/
/* Index: EMPLEADOFACTURA_FK                                    */
/*==============================================================*/
create index EMPLEADOFACTURA_FK on FACTURA (
   CODEMPLEADOFK ASC
);

/*==============================================================*/
/* Table: HISTORICOPRECIO                                       */
/*==============================================================*/
create table HISTORICOPRECIO (
   IDCATPRODUCTOFK      VARCHAR2(5)           not null,
   REFPRODUCTOFK        VARCHAR2(5)           not null,
   CONSECPRECIO         NUMBER(4,0)           not null,
   FECHAINICIO          DATE                  not null,
   FECHAFIN             DATE,
   VALOR                NUMBER(10,2)          not null,
   constraint PK_HISTORICOPRECIO primary key (IDCATPRODUCTOFK, REFPRODUCTOFK, CONSECPRECIO)
);

/*==============================================================*/
/* Index: PRODUCTOHISTORICOPRECIO_FK                            */
/*==============================================================*/
create index PRODUCTOHISTORICOPRECIO_FK on HISTORICOPRECIO (
   IDCATPRODUCTOFK ASC,
   REFPRODUCTOFK ASC
);

/*==============================================================*/
/* Table: INVENTARIO                                            */
/*==============================================================*/
create table INVENTARIO (
   CONSECINVEN          NUMBER(5)             not null,
   IDCATPRODUCTOFK      VARCHAR2(5)           not null,
   REFPRODUCTOFK        VARCHAR2(5)           not null,
   TIPOFACFK            VARCHAR2(3)           not null,
   FACTURAFK            VARCHAR2(5)           not null,
   IDDETALLEFACTURAFK   VARCHAR2(5)           not null,
   CONSECINVENREF       NUMBER(5),
   FECHAINVE            DATE                  not null,
   SALEN                NUMBER(5,0),
   ENTRAN               NUMBER(5,0),
   EXISTENCIA           NUMBER(5)             not null,
   constraint PK_INVENTARIO primary key (CONSECINVEN)
);

/*==============================================================*/
/* Index: PRODUCTOINVENTARIO_FK                                 */
/*==============================================================*/
create index PRODUCTOINVENTARIO_FK on INVENTARIO (
   IDCATPRODUCTOFK ASC,
   REFPRODUCTOFK ASC
);

/*==============================================================*/
/* Index: DETALLEFACTURAINVENTARIO_FK                           */
/*==============================================================*/
create index DETALLEFACTURAINVENTARIO_FK on INVENTARIO (
   TIPOFACFK ASC,
   FACTURAFK ASC,
   IDDETALLEFACTURAFK ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_25_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_25_FK on INVENTARIO (
   CONSECINVENREF ASC
);

/*==============================================================*/
/* Table: NOMENCLATURA                                          */
/*==============================================================*/
create table NOMENCLATURA (
   IDNOMEN              VARCHAR2(6)           not null,
   POSICIONFK           NUMBER(2)             not null,
   DESCNOMEN            VARCHAR2(50)          not null,
   constraint PK_NOMENCLATURA primary key (IDNOMEN)
);

/*==============================================================*/
/* Index: RELATIONSHIP_23_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_23_FK on NOMENCLATURA (
   POSICIONFK ASC
);

/*==============================================================*/
/* Table: PERSONA                                               */
/*==============================================================*/
create table PERSONA (
   IDTIPOPERSONAFK      VARCHAR2(2)           not null,
   IDTIPODOCFK          VARCHAR2(3)           not null,
   NDOCUMENTO           VARCHAR2(12)          not null,
   NOMBRE               VARCHAR2(30)          not null,
   APELLIDO             VARCHAR2(30)          not null,
   constraint PK_PERSONA primary key (IDTIPOPERSONAFK, IDTIPODOCFK, NDOCUMENTO)
);

/*==============================================================*/
/* Index: PERSONATIPODOC_FK                                     */
/*==============================================================*/
create index PERSONATIPODOC_FK on PERSONA (
   IDTIPODOCFK ASC
);

/*==============================================================*/
/* Index: PERSONATIPOPERSONA_FK                                 */
/*==============================================================*/
create index PERSONATIPOPERSONA_FK on PERSONA (
   IDTIPOPERSONAFK ASC
);

/*==============================================================*/
/* Table: PRODUCTO                                              */
/*==============================================================*/
create table PRODUCTO (
   IDCATPRODUCTOFK      VARCHAR2(5)           not null,
   REFPRODUCTO          VARCHAR2(5)           not null,
   NOMPRODUCTO          VARCHAR2(30)          not null,
   constraint PK_PRODUCTO primary key (IDCATPRODUCTOFK, REFPRODUCTO)
);

/*==============================================================*/
/* Index: CATPRODUCTO_FK                                        */
/*==============================================================*/
create index CATPRODUCTO_FK on PRODUCTO (
   IDCATPRODUCTOFK ASC
);

/*==============================================================*/
/* Table: TIPOCONTACTO                                          */
/*==============================================================*/
create table TIPOCONTACTO (
   IDTIPOCONTACTO       VARCHAR2(2)           not null,
   DESCTIPOCONTACTO     VARCHAR2(30)          not null,
   constraint PK_TIPOCONTACTO primary key (IDTIPOCONTACTO, DESCTIPOCONTACTO)
);

/*==============================================================*/
/* Table: TIPODOC                                               */
/*==============================================================*/
create table TIPODOC (
   IDTIPODOC            VARCHAR2(3)           not null,
   DESCTIPODOC          VARCHAR2(30)          not null,
   constraint PK_TIPODOC primary key (IDTIPODOC)
);

/*==============================================================*/
/* Table: TIPOFACTURA                                           */
/*==============================================================*/
create table TIPOFACTURA (
   IDTIPOFAC            VARCHAR2(3)           not null,
   DESCTIPOFAC          VARCHAR2(30)          not null,
   constraint PK_TIPOFACTURA primary key (IDTIPOFAC)
);

/*==============================================================*/
/* Table: TIPOPERSONA                                           */
/*==============================================================*/
create table TIPOPERSONA (
   IDTIPOPERSONA        VARCHAR2(2)           not null,
   DESCTIPOPERSONA      VARCHAR2(20)          not null,
   constraint PK_TIPOPERSONA primary key (IDTIPOPERSONA)
);

alter table CARGO
   add constraint FK_CARGO_CARGOCARG_CARGO foreign key (CODCARGOREF)
      references CARGO (CODCARGO);

alter table CARGO
   add constraint FK_CARGO_DEPENDENC_DEPENDEN foreign key (CODDEPENDENCIAFK)
      references DEPENDENCIA (CODDEPENDENCIA);

alter table CATPRODUCTO
   add constraint FK_CATPRODU_CATPRODUC_CATPRODU foreign key (CATPRODUCTOREF)
      references CATPRODUCTO (IDCATPRODUCTO);

alter table CONTACTO
   add constraint FK_CONTACTO_CONTACTOP_PERSONA foreign key (IDTIPOPERSONAFK, IDTIPODOCFK, NDOCUMENTOFK)
      references PERSONA (IDTIPOPERSONAFK, IDTIPODOCFK, NDOCUMENTO);

alter table CONTACTO
   add constraint FK_CONTACTO_TIPOCONTA_TIPOCONT foreign key (IDTIPOCONTACTOFK, DESCTIPOCONTACTOFK)
      references TIPOCONTACTO (IDTIPOCONTACTO, DESCTIPOCONTACTO);

alter table DETALLEFACTURA
   add constraint FK_DETALLEF_DETALLEFA_PRODUCTO foreign key (IDCATPRODUCTOFK, REFPRODUCTOFK)
      references PRODUCTO (IDCATPRODUCTOFK, REFPRODUCTO);

alter table DETALLEFACTURA
   add constraint FK_DETALLEF_FACTURADE_FACTURA foreign key (IDTIPOFACFK, NFACTURAFK)
      references FACTURA (IDTIPOFACFK, NFACTURA);

alter table DIRECCION
   add constraint FK_DIRECCIO_COMPONENE_COMPONEN foreign key (POSICION)
      references COMPONENTEDIREC (IDCOMPDIRECCION);

alter table DIRECCION
   add constraint FK_DIRECCIO_NOMENCLAT_NOMENCLA foreign key (IDNOMENFK)
      references NOMENCLATURA (IDNOMEN);

alter table DIRECCION
   add constraint FK_DIRECCIO_PERSONADI_PERSONA foreign key (IDTIPOPERSONAFK, IDTIPODOCFK, NDOCUMENTOFK)
      references PERSONA (IDTIPOPERSONAFK, IDTIPODOCFK, NDOCUMENTO);

alter table EMPLEADOCARGO
   add constraint FK_EMPLEADO_CARGOEMPL_CARGO foreign key (CODCARGOFK)
      references CARGO (CODCARGO);

alter table EMPLEADOCARGO
   add constraint FK_EMPLEADO_EMPLEADOC_EMPLEADO foreign key (CODEMPLEADOFK)
      references EMPLEADO (CODEMPLEADO);

alter table FACTURA
   add constraint FK_FACTURA_EMPLEADOF_EMPLEADO foreign key (CODEMPLEADOFK)
      references EMPLEADO (CODEMPLEADO);

alter table FACTURA
   add constraint FK_FACTURA_FACTURAFA_FACTURA foreign key (TIPOFACREF, NFACTURAREF)
      references FACTURA (IDTIPOFACFK, NFACTURA);

alter table FACTURA
   add constraint FK_FACTURA_FACTURATI_TIPOFACT foreign key (IDTIPOFACFK)
      references TIPOFACTURA (IDTIPOFAC);

alter table FACTURA
   add constraint FK_FACTURA_PERSONAFA_PERSONA foreign key (IDTIPOPERSONAFK, IDTIPODOCFK, NDOCUMENTOFK)
      references PERSONA (IDTIPOPERSONAFK, IDTIPODOCFK, NDOCUMENTO);

alter table HISTORICOPRECIO
   add constraint FK_HISTORIC_PRODUCTOH_PRODUCTO foreign key (IDCATPRODUCTOFK, REFPRODUCTOFK)
      references PRODUCTO (IDCATPRODUCTOFK, REFPRODUCTO);

alter table INVENTARIO
   add constraint FK_INVENTAR_DETALLEFA_DETALLEF foreign key (TIPOFACFK, FACTURAFK, IDDETALLEFACTURAFK)
      references DETALLEFACTURA (IDTIPOFACFK, NFACTURAFK, IDDETALLEFACTURA);

alter table INVENTARIO
   add constraint FK_INVENTAR_INVENTARI_INVENTAR foreign key (CONSECINVENREF)
      references INVENTARIO (CONSECINVEN);

alter table INVENTARIO
   add constraint FK_INVENTAR_PRODUCTOI_PRODUCTO foreign key (IDCATPRODUCTOFK, REFPRODUCTOFK)
      references PRODUCTO (IDCATPRODUCTOFK, REFPRODUCTO);

alter table NOMENCLATURA
   add constraint FK_NOMENCLA_COMPONENT_COMPONEN foreign key (POSICIONFK)
      references COMPONENTEDIREC (IDCOMPDIRECCION);

alter table PERSONA
   add constraint FK_PERSONA_PERSONATI_TIPODOC foreign key (IDTIPODOCFK)
      references TIPODOC (IDTIPODOC);

alter table PERSONA
   add constraint FK_PERSONA_PERSONATI_TIPOPERS foreign key (IDTIPOPERSONAFK)
      references TIPOPERSONA (IDTIPOPERSONA);

alter table PRODUCTO
   add constraint FK_PRODUCTO_CATPRODUC_CATPRODU foreign key (IDCATPRODUCTOFK)
      references CATPRODUCTO (IDCATPRODUCTO);

