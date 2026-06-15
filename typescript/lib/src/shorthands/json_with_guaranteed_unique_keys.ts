import * as pt from 'pareto-core-shorthands/dist/unconstrained'

import * as d_out from "../interface/generated/liana/schemas/json_with_guaranteed_unique_keys/data"


export namespace v {

    export const string = (
        value: string
    ): d_out.Value => ['string', value]

    export const null_ = (
    ): d_out.Value => ['null', null]

    export const object = (
        members: pt.Raw_Or_Normal_Dictionary<d_out.Value.object_.D>
    ): d_out.Value => ['object', pt.dictionary(members)]

    export const array = (
        elements: pt.Raw_Or_Normal_List<d_out.Value.array.L>
    ): d_out.Value => ['array', pt.list(elements)]
}