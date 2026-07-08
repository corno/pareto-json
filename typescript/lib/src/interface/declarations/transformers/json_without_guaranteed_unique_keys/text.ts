import type * as p_i from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../generated/liana/schemas/json_without_guaranteed_unique_keys/data.js"
import type * as d_out from "pareto-fountain-pen/interface/generated/liana/schemas/text/data"
import type * as d_function from "pareto-fountain-pen/interface/data/prose_serialize"

export namespace interface_ {
    export type Value = p_i.Transformer_With_Parameter<
        d_in.Value,
        d_out.Text,
        d_function.Parameters
    >
}
