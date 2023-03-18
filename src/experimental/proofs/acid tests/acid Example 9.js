////////////////////////////////////////////////////////////////////
// Acid Test Proofs
// 
// These are the example and counterexample proofs from the END document

(<<< "Example 9 from END")
{
   (<<< "Thm: 1<1 (generalizing inside a Let environment)")
   { 
     {:[ z ]
       {:(< 2 z)
         (< 1 z) ✔︎
         (∀ x , (< 1 x)) ✗
       }
      (⇒ (< 2 z) (∀ x , (< 1 x))) ✔︎
     }
     (∀ y , (⇒ (< 2 z) (∀ x , (< 1 x))) ) ✗
     (⇒ (< 2 3) (∀ x , (< 1 x))) ✗
     (∀ x , (< 1 x)) ✔︎
     (< 1 1) ✔︎
   }
   
}