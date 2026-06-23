import * as p_ from 'pareto-core-shorthands/dist/unconstrained_target'

import * as d_out from "../interface/generated/liana/schemas/json_with_guaranteed_unique_keys/data"


export namespace v {

    export const string = (
        value: string
    ): d_out.Value => ['string', value]

    export const null_ = (
    ): d_out.Value => ['null', null]

    export const object = (
        members: p_.Normal_Dictionary<d_out.Value.object_.D>
    ): d_out.Value => ['object', p_.dictionary(members)]

    export const array = (
        elements: p_.Normal_List<d_out.Value.array.L>
    ): d_out.Value => ['array', p_.list(elements)]
}