var should = require('./init.js');

var db, Model;

describe('json-parsing', function() {

    before(function() {
        db = getSchema();
        Model = db.define('Model', { name: String });
    });

    it('should not parse String as JSON', function (done) {
        var m = new Model({name: '{"property": true}'});
        m.save(function (err, mm) {
            should.not.exist(err);
            should.exist(mm);
            mm.name.should.equal('{"property": true}');
            Model.findById(mm.id, function (err, mmm) {
                should.not.exist(err);
                should.exist(mmm);
                mmm.name.should.be.a.String;
                mmm.name.should.equal('{"property": true}');
                done();
            });
        });
    });

    it('should set ttl successful', function (done) {
        this.timeout(3000)
        var m = new Model({name: 'hehe', id: 1});
        Model.create(m, {ttl: 1}, function (err, mm) {
            should.not.exist(err);
            should.exist(mm);
            setTimeout(function () {
                Model.findById(1, function (err, mmm) {
                    should.not.exist(err);
                    // should.be.empty(mmm)
                    (mmm).should.be.empty;
                    done()
                })
            }, 2000)
           
        })
    })

});
