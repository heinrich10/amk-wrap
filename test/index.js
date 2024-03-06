const wrap = require('../index');

describe('Wrapper function', async () => {
	let expect;
	// temporarily use this to import chai
	before(async () => {
		const chai = await import('chai');
		expect = chai.expect;
	});
	it('Should wrap the function with the context, then execute normally', async () => {
		class TestClass {
			constructor() {
				this.value = 2;
			}
			async setValue(req, res) {
				req.value = this.value;
				res.value = this.value;
			}
		}

		const testClass = new TestClass();
		const fn = wrap(testClass, 'setValue');
		let res = { value: 0 };
		let req = { value: 0 };
		await fn(req, res, (err) => { expect(err).to.be.undefined; });

		expect(req.value).to.be.equal(2);
		expect(res.value).to.be.equal(2);
	});
	it('Should catch the error when the async function throws an error', async () => {
		class TestClass {
			async setValue() {
				throw new Error();
			}
		}

		const fn = wrap(new TestClass(), 'setValue');
		await fn(null, null, (err) => {
			expect(err).to.be.instanceOf(Error);
		});
	});
	it('Should throw error when context is wrong', async () => {
		const someFunction = async () => {};

		const fn = wrap(this, someFunction);
		try {
			await fn(null, null, (err) => { expect(err).to.be.undefined; });
		} catch (err) {
			expect(err).to.be.instanceOf(TypeError);
		}
	});
});