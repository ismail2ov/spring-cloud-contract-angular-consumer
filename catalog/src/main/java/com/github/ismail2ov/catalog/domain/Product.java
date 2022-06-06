package com.github.ismail2ov.catalog.domain;

import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Product {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    @Convert(converter = PriceConverter.class)
    private Price price;

}
