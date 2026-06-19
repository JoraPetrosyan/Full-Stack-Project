CREATE TABLE product
(
    id    BIGINT AUTO_INCREMENT NOT NULL,
    name  VARCHAR(255)          NULL,
    price DOUBLE                NULL,
    stock INT                   NULL,
    CONSTRAINT pk_product PRIMARY KEY (id)
);