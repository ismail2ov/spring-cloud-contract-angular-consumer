package com.github.ismail2ov.catalog.domain;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class PriceConverter implements AttributeConverter<Price, String> {
    private static final String SEPARATOR = ",";

    @Override
    public String convertToDatabaseColumn(Price price) {
        if (price == null) {
            return null;
        }

        StringBuilder sb = new StringBuilder();
        if (price.getCurrency() != null && !price.getCurrency()
                .isEmpty()) {
            sb.append(price.getCurrency());
            sb.append(SEPARATOR);
        }

        if (price.getAmount() != null && !price.getAmount().isEmpty()) {
            sb.append(price.getAmount());
        }

        return sb.toString();
    }

    @Override
    public Price convertToEntityAttribute(String dbPrice) {
        if (dbPrice == null || dbPrice.isEmpty()) {
            return null;
        }

        String[] pieces = dbPrice.split(SEPARATOR);

        if (pieces.length == 0) {
            return null;
        }

        Price price = new Price();
        String firstPiece = !pieces[0].isEmpty() ? pieces[0] : null;
        if (dbPrice.contains(SEPARATOR)) {
            price.setCurrency(firstPiece);

            if (pieces.length >= 2 && pieces[1] != null && !pieces[1].isEmpty()) {
                price.setAmount(pieces[1]);
            }
        } else {
            price.setAmount(firstPiece);
        }

        return price;
    }
}
