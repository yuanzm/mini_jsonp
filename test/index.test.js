import should           from 'should';
import sinon            from 'sinon';
import * as shouldSinon from 'should-sinon';
import {
	mapToStr,
	uuid,
	jsonp
} from '../src/index';

function removeAllScript() {
	// clear all jsonp script
	Array.of(document.getElementsByTagName('script'))
    	.forEach((script, index, array) => {
    		if ( script.parentNode )
    			script.parentNode.removeChild(script);
	    });	
}

function getJsonpScript() {
	return [...document.getElementsByTagName('script')]
	    	.filter((script) => {
		    	return script.className === '__jsonp__';
		    });
}

describe('jsonp--test', () => {
	describe('mapToStr', () => {
		it ('should map json to string correctlly', () => {
			let a = {
				foo  : 'bar'
			};

			let b = {
				foo  : 'bar',
				foo2 : 'bar2'
			};

			mapToStr(a).should.equal('foo=bar');			
			mapToStr(b).should.equal('foo=bar&foo2=bar2');
		});
	});

	describe('uuid', () => {
		it ('should generate different uuids', () => {
			let id1 = uuid();
			let id2 = uuid();

			id1.should.not.equal(id2);
		});

		it ('should generate uuid with length of 13', () => {
			let id1 = uuid();
			id1.should.have.lengthOf(13);
		});
	});

	describe('jsonp', ()=> {
		let url = 'http://foo.com/';

		beforeEach(() => {
			removeAllScript();
		});

		it('should splice url correctly', () => {
			setTimeout(() => {
			    jsonp(url, {foo: 'bar'});

			    let script = getJsonpScript();

			    script[0].src.should.containEql('http://foo.com/?foo=bar');
			}, 0);
		});

		it('should cancel request successfully', () => {
		    jsonp(url, {foo: 'bar'})();

		  	setTimeout(() => {
			    let script = getJsonpScript();

			    script.should.be.lengthOf(0);
		  	}, 0);
		});

		it('should set timer correctly', () => {
			setTimeout(() => {
			    jsonp(url, {foo: 'bar'}, () => {}, {timeout: 1000})();

			  	setTimeout(() => {
				    let script = getJsonpScript();

				    script.should.be.lengthOf(0);
			  	}, 1050);
			}, 0);
		});

		it('should fire callback function correctly', () => {
			let callback = sinon.spy();
			let tmp = {
				jsonp
			};
			let stub = sinon.stub(tmp, 'jsonp');

			stub.yields({foo: 'bar'});

			tmp.jsonp(url, {}, callback);

			callback.should.have.callCount(1);
		});
	});
});
