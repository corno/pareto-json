import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/generated/liana/schemas/json_with_guaranteed_unique_keys/data"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/text/data"
import * as d_function_fp from "pareto-fountain-pen/dist/interface/data/prose_serialize"


//dependencies
import * as t_to_fp from "./fountain_pen"
import * as t_fp_to_text from "pareto-fountain-pen/dist/implementation/manual/transformers/prose/text"


export const Value: p_i.Transformer_With_Parameter<
    d_in.Value,
    d_out.Text,
    d_function_fp.Parameters
> = ($, $p) => t_fp_to_text.Phrase(
    t_to_fp.Value($),
    $p
)