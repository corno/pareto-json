// import * as p_ from 'pareto-core/implementation/serializer'

// //schemas
// import type * as s_in from "../../private_schemas/unmarshalled_from_parse_tree.js"

// namespace declarations {
//     export type Error = p_.Serializer<
//         s_in.Error
//     >
// }

// //dependencies
// import * as t_json_from_parse_tree_to_prose from "./deserialize_json.js"
// import * as t_unmarshalled_from_json_to_prose from "./unmarshalled_from_json.js"




// export const Error: declarations.Error = ($) => p_.from.state($).decide(
//     ($) => {
//         switch ($[0]) {
//             case 'json': return p_.option($, ($) => t_json_from_parse_tree_to_prose.Error($))
//             case 'unmarshall': return p_.option($, ($) => t_unmarshalled_from_json_to_prose.Error($))

//             default: return p_.exhaustive($[0])
//         }
//     })