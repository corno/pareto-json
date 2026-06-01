export type Error = {
    'unexpected astn concept':
    | ['missing property', null]
    | ['apostrophed text', null]
    | ['backticked text', null]
    | ['undelimited text', null]
    | ['group', null]
    | ['include', null]
    | ['missing data', null]
    | ['nothing', null]
    | ['optional', null]
    | ['state', null]
}