
import * as _out from "../interface/generated/pareto/schemas/json/data_types/target"

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
    ): _out.Value => ['string', value]

    export const null_ = (
    ): _out.Value => ['null', null]

    export const object = (
        members: Raw_Or_Normal_Dictionary<_out.Value.SG._object.SG.dictionary.D>
    ): _out.Value => ['object', ['dictionary', wrap_dictionary(members)]]

    export const array = (
        elements: Raw_Or_Normal_List<_out.Value.SG.array.L>
    ): _out.Value => ['array', wrap_list(elements)]

}