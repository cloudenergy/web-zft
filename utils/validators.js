
export function validPrice(input) {
  let regPos = /^\d+(\.\d+)?$/; //非负浮点数
	let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
	return (regPos.test(input) ||regNeg.test(input)) && input > 0
}
