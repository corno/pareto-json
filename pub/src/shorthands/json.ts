
import * as d_out from "../interface/generated/pareto/schemas/json/data_types/target"

import {
    Raw_Or_Normal_Dictionary,
    Raw_Or_Normal_List,
    wrap_list,
    wrap_dictionary,
    wrap_state_group,
} from 'pareto-core-shorthands/dist/unconstrained'

export namespace v {

    export const string = (
        value: string
    ): d_out.Value => ['string', value]

    export const null_ = (
    ): d_out.Value => ['null', null]

    export const object = (
        members: Raw_Or_Normal_Dictionary<d_out.Value.SG._object.SG.dictionary.D>
    ): d_out.Value => ['object', ['dictionary', wrap_dictionary(members)]]

    export const array = (
        elements: Raw_Or_Normal_List<d_out.Value.SG.array.L>
    ): d_out.Value => ['array', wrap_list(elements)]

}