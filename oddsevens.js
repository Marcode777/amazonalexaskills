// create a function that takes an array of numbers
// and returns true if a sum of any 2 numbers in the array are also in this array
// [3, 1, 2] // true because 2+1 = 3
// [3, 1, 5, 9, 15, 20]
// this is actually not checking for odds or evens, but for the description above 

function checkArrayElementsForValue(array, value) {
  for(var i=0; i < array.length; i++) {
    if(array[i] === value)
      return true
  }
  return false
}

testValue = 5
testArray = [3,1,2]

checkArrayElementsForValue(testArray, testValue)