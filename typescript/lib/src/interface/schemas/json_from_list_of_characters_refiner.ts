import type * as s_deserialize from "./deserialize_parse_tree.js"
import type * as s_json_from_parse_tree from "./json_from_parse_tree_refiner.js"

export type Error = 
| ['deserialize astn parse tree', s_deserialize.Error]
| ['jsonify', s_json_from_parse_tree.Error]