import { format, parseISO } from "date-fns";

export const formattingPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(price);
};

export const formattingDateWithoutYear = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });
};

export const formattingDateWithYear = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

export const formatDate = (dateString) => {
    return format(parseISO(dateString), "dd MMM yyyy");
};
