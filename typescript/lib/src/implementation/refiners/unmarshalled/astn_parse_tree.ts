
// //schemas
// import type * as s_in from "astn-core/interface/data/parse_tree"
// import type * as s_function from "../../../../interface/schemas/unmarshalled_from_parse_tree_x.js"
// import type * as s_location from "astn-core/interface/data/location"

// import type * as s_astn_unmarshalled from "astn-core/interface/data/unmarshalled"

// //dependencies
// import * as r_astn_unmarshalled_from_parse_tree from "astn-core/implementation/refiners/unmarshalled/parse_tree"
// import * as t_astn_parse_tree_to_location from "astn-core/implementation/transformers/parse_tree/start_token_range"
// import * as r_primitives_from_loc from "../primitives/list_of_characters.js"
// import p_list_from_text from 'pareto-core/implementation/refiner/specials/list_from_text'


// export const Array_Dynamic = (
//     $: s_in.Value,
//     abort: p_i.Abort<s_function.Error>,
// ) => {
//     return r_astn_unmarshalled_from_parse_tree.List(
//         $,
//         ($) => abort(['astn', $]),
//     )
// }

// export const Boolean = (
//     $: s_in.Value,
//     abort: p_i.Abort<s_function.Error>,
// ): boolean => {
//     const value = $
//     return p_.from.state($.type).decide(
//($) => {
//         switch ($[0]) {
//             case 'concrete': return p_.option($, ($): boolean => p_.from.state($).decide(
//($) => {
//                 switch ($[0]) {
//                     case 'text': return p_.option($, ($) => {
//                         const text_value = $
//                         return p_.from.state($.token.type).decide(
//($) => {
//                             switch ($[0]) {
//                                 case 'undelimited': return p_.option($, ($) => text_value.token.value === "true"
//                                     ? true
//                                     : text_value.token.value === "false"
//                                         ? false
//                                         : abort(['json', {
//                                             'type': ['not a boolean', null],
//                                             'range': t_astn_parse_tree_to_location.Value(value),
//                                         }])
//                                 )
//                                 default: return abort(['json', {
//                                     'type': ['not a boolean', null],
//                                     'range': t_astn_parse_tree_to_location.Value(value),
//                                 }])
//                             }
//                         })
//                     })
//                     default: return abort(['json', {
//                         'type': ['not a boolean', null],
//                         'range': t_astn_parse_tree_to_location.Value(value),
//                     }])
//                 }
//             }))
//             default: return abort(['json', {
//                 'type': ['not a boolean', null],
//                 'range': t_astn_parse_tree_to_location.Value(value),
//             }])
//         }
//     })
// }

// export const Null = (
//     $: s_in.Value,
//     abort: p_i.Abort<s_function.Error>,
// ): null => {
//     const value = $
//     return p_.from.state($.type).decide(
//($) => {
//         switch ($[0]) {
//             case 'concrete': return p_.option($, ($): null => p_.from.state($).decide(
//($) => {
//                 switch ($[0]) {
//                     case 'text': return p_.option($, ($) => {
//                         const text_value = $
//                         return p_.from.state($.token.type).decide(
//($) => {
//                             switch ($[0]) {
//                                 case 'undelimited': return p_.option($, ($) => text_value.token.value === "null"
//                                     ? null
//                                     : abort(['json', {
//                                         'type': ['not a null', null],
//                                         'range': t_astn_parse_tree_to_location.Value(value),
//                                     }])
//                                 )
//                                 default: return abort(['json', {
//                                     'type': ['not a null', null],
//                                     'range': t_astn_parse_tree_to_location.Value(value),
//                                 }])
//                             }
//                         })
//                     })
//                     default: return abort(['json', {
//                         'type': ['not a null', null],
//                         'range': t_astn_parse_tree_to_location.Value(value),
//                     }])
//                 }
//             }))
//             default: return abort(['json', {
//                 'type': ['not a null', null],
//                 'range': t_astn_parse_tree_to_location.Value(value),
//             }])
//         }
//     })
// }

// export const Number = (
//     $: s_in.Value,
//     abort: p_i.Abort<s_function.Error>,
// ): number => {
//     const value = $
//     return p_.from.state($.type).decide(
//($) => {
//         switch ($[0]) {
//             case 'concrete': return p_.option($, ($) => p_.from.state($).decide(
//($) => {
//                 switch ($[0]) {
//                     case 'text': return p_.option($, ($) => {
//                         const text_value = $
//                         return p_.from.state($.token.type).decide(
//($) => {
//                             switch ($[0]) {
//                                 case 'undelimited': return p_.option($, ($) => r_primitives_from_loc.Number(
//                                     p_list_from_text(
//                                         text_value.token.value,
//                                         ($) => $,
//                                     ),
//                                     () => abort(['json', {
//                                         'type': ['not a number', null],
//                                         'range': t_astn_parse_tree_to_location.Value(value),
//                                     }]),
//                                 ))
//                                 default: return abort(['json', {
//                                     'type': ['not a number', null],
//                                     'range': t_astn_parse_tree_to_location.Value(value),
//                                 }])
//                             }
//                         })
//                     })
//                     default: return abort(['json', {
//                         'type': ['not a number', null],
//                         'range': t_astn_parse_tree_to_location.Value(value),
//                     }])
//                 }
//             }))
//             default: return abort(['json', {
//                 'type': ['not a number', null],
//                 'range': t_astn_parse_tree_to_location.Value(value),
//             }])
//         }
//     })
// }

// export const Object_Dynamic = (
//     $: s_in.Value,
//     abort: p_i.Abort<s_function.Error>,
// ) => r_astn_unmarshalled_from_parse_tree.Dictionary(
//     $,
//     ($) => abort(['astn', $]),
// )

// export const Object_Static = (
//     $: s_in.Value,
//     abort: p_i.Abort<s_function.Error>,
//     $p: {
//         'expected properties': p_di.Dictionary<null>
//     }
// ) => {
//     const dictionary = r_astn_unmarshalled_from_parse_tree.Dictionary(
//         $,
//         ($) => abort(['astn', $]),
//     )

//     const unexpected_properties = p_.from.dictionary(//         p_.from.dictionary(//             dictionary.entries,
//         ).join(
//             $p['expected properties'],
//             ($, other, id): p_di.Optional_Value<s_location.Range> => p_.decide.optional(
//                 other,
//                 () => p_.literal.not_set(),
//                 () => p_.literal.set($.id.range)
//             )
//         )
//     ).map_optionally(
//         ($) => $
//     )

//     if (unexpected_properties.__get_number_of_entries() > 0) {
//         return abort(['json', {
//             'type': ['unexpected properties', unexpected_properties],
//             'range': t_astn_parse_tree_to_location.Value($),
//         }])
//     }

//     return dictionary
// }

// export const Optional_Null = (
//     $: s_in.Value,
// ): p_di.Optional_Value<s_in.Value> => {
//     const value = $
//     return p_.from.state($.type).decide(
//($) => {
//         switch ($[0]) {
//             case 'concrete': return p_.option($, ($) => p_.from.state($).decide(
//($) => {
//                 switch ($[0]) {
//                     case 'text': return p_.option($, ($) => {
//                         const text_value = $
//                         return p_.from.state($.token.type).decide(
//($) => {
//                             switch ($[0]) {
//                                 case 'undelimited': return p_.option($, ($) => text_value.token.value === "null"
//                                     ? p_.literal.not_set()
//                                     : p_.literal.set(value)
//                                 )
//                                 default: return p_.literal.set(value)
//                             }
//                         })
//                     })
//                     default: return p_.literal.set(value)
//                 }
//             }))
//             default: return p_.literal.set(value)
//         }
//     })
// }

// export const Property = (
//     $: s_astn_unmarshalled.Dictionary,
//     abort: p_i.Abort<s_function.Error>,
//     $p: {
//         'id': string
//     }
// ): s_in.Value => {
//     const dict = $
//     return $.entries.__ get_entry_deprecated(
//         $p.id,
//         {
//             no_such_entry: () => abort(['json', {
//                 'type': ['missing property', $p.id],
//                 'range': t_astn_parse_tree_to_location.Value(dict.value),
//             }])
//         }
//     ).assignment.__ decide(
//         ($) => $.value.__ decide(
//             ($) => $,
//             () => abort(['json', {
//                 'type': ['missing property', $p.id],
//                 'range': t_astn_parse_tree_to_location.Value(dict.value),
//             }])

//         ),
//         () => abort(['json', {
//             'type': ['missing property', $p.id],
//             'range': t_astn_parse_tree_to_location.Value(dict.value),
//         }])
//     )
// }

// export const String = (
//     $: s_in.Value,
//     abort: p_i.Abort<s_function.Error>,
// ) => {
//     const xxx = r_astn_unmarshalled_from_parse_tree.Text(
//         $,
//         ($) => abort(['astn', $]),
//     )
//     if (xxx.token.type[0] !== 'quoted') {
//         return abort(['json', {
//             'type': ['not a string', null],
//             'range': t_astn_parse_tree_to_location.Value($),
//         }])
//     }
//     return xxx.token.value
// }

