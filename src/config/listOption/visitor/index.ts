import { VisitorCategoryDescriptionEnum } from "@config/constant/visitor"

export const VisitorCategoryOptions : {
    key: number,
    label: VisitorCategoryDescriptionEnum,
    value: keyof typeof VisitorCategoryDescriptionEnum
}[] = [
    {
        key: 0,
        label: VisitorCategoryDescriptionEnum.FM,
        value: "FM",
    },
    {
        key: 1,
        label: VisitorCategoryDescriptionEnum.F,
        value: "F",
    },
    {
        key: 2,
        label: VisitorCategoryDescriptionEnum.R,
        value: "R"
    }
]
