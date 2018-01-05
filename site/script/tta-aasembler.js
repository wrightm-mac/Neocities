{
  instructions: [
      "[LOCAL]",
      "constants:",
      "   __0=0",
      "   __1=1",
      "   __FF=FF",
      "data:",
      "   $source",
      "   $destination",
      "parameters:",
      "   STACK, REG-01",
      "   #00040000, STACK-PP",
      "   STACK, REG-02",
      "   #00040000, STACK-PP",
      "code:",
      "   #REG-01, ADD-A    ; Move the value at reg-01 to add",
      "   #FF, ADD-T        ; Trigger add with #ff",
      "   #ADD-A, COMPARE-A ; Move result of add to compare",
      "   #REG-01, ADD-A    ; Start the loop with original values",
      "   #REG-02, ADD-B",
      "   $loop, JUMP-A",
      "   $endloop, JUMP-B",
      "loop:",
      "   ADD-A, ADD-B      ; Copy value from location-a to location-b",
      "   #ADD-A, COMPARE-T ; Trigger comparison with current value of add",
      "   EQ, JUMP-B-MASK   ; Jump if comparison true",
      "endloop:",
      "   #1, ADD-T",
      "   ALWAYS, JUMP-A-MASK",
      "return:",
      "   STACK, JUMP-A",
      "   #00040000, STACK-PP",
      "   ALWAYS, JUMP-A-MASK",
      "end:"
    ]
}