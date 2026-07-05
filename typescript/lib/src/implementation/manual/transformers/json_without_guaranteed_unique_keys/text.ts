import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/generated/liana/schemas/json_without_guaranteed_unique_keys/data"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/text/data"
import * as d_function from "pareto-fountain-pen/dist/interface/data/prose_serialize"

export namespace interface_ {
    export type Value = p_i.Transformer_With_Parameter<
        d_in.Value,
        d_out.Text,
        d_function.Parameters
    >
}

//dependencies
import * as t_to_prose from "./prose"
import * as t_prose_to_text from "pareto-fountain-pen/dist/implementation/manual/transformers/prose/text"


export const Value: interface_.Value = ($, $p) => t_prose_to_text.Phrase(
    t_to_prose.Value($),
    $p
)