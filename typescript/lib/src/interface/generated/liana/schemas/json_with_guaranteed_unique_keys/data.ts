
import * as p_i from 'pareto-core/dist/__internals/Abort'
import * as p_di from 'pareto-core/dist/data/interface'

export type Document_ = Value_

export namespace Value_ {
    
    export namespace array {
        
        export type L = Value_
        
    }
    
    export type array = p_di.List<array.L>
    
    export namespace object_ {
        
        export type D = Value_
        
    }
    
    export type object_ = p_di.Dictionary<object_.D>
    
    export namespace number_ {
        
        export type integer = number
        
        export type float = number
        
    }
    
    export type number_ = 
        | readonly ['integer', number_.integer]
        | readonly ['float', number_.float]
    
    export type string_ = string
    
    export type boolean_ = boolean
    
    export type null_ = null
    
}

export type Value_ = 
    | readonly ['array', Value_.array]
    | readonly ['object', Value_.object_]
    | readonly ['number', Value_.number_]
    | readonly ['string', Value_.string_]
    | readonly ['boolean', Value_.boolean_]
    | readonly ['null', Value_.null_]

export { 
    Document_ as Document, 
    Value_ as Value, 
}
