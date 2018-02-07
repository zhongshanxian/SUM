/*
const obj = {
	get foo(){},
	set foo(x){}
};

const desc = Object.getOwnPropertyDescriptor(obj,'foo');
console.log(desc.get.name);


const key1 = Symbol("desc");
const key2 = Symbol("12300");
const obj  = {
	[key1](){},
	[key2](){}
};
console.log(obj[key1].name);


console.log(Object.is(-0,+0));
console.log(Object.is(NaN,NaN));


let mix = (object) => ({
	with:(...mixins) => mixins.reduce(
		(c, mixin)=> Object.create(
			c,Object.getOwnPropertyDescriptors(mixin)
		),object)
});
let a = {a: 'a'};
let b = {b: 'b'};
let c = {c: 'c'};
let d = mix(c).with(a,b);
console.log(d.c);
*/

