/**
 * Created by pawel on 19.10.17.
 */
//var nors = [1414, 1590, 1520, 1630, 1609, 1482, 1581,
//    1576, 1667, 1956,
//    1608, 1446, 1428,
//    1620, 1690, 1574,
//    1508, 1627, 1557,
//    1967];

//var nors = [4,5,3,2,17,12,9, 13, 6, 7];

function calculate_nors(sum, nors)  {
    var  get_nors = memoize(function(sum, nors) {
        if (sum < 0)
        {
            return 0;
        }
        var nors = get_red_of_too_big(nors, sum);

        if (nors.length == 0) {
            return [];
        }

        if (nors.length == 1) {
            return nors[0] == sum ? nors : [];
        }

        if (nors.length == 2) {
            if (nors[0] + nors[1] == sum) {
                return [nors];
            } else if (nors[0] == sum) {
                return [nors[0]];
            } else if (nors[1] == sum) {
                return [nors[1]];
            }
            else {
                return [];
            }
        }

        var biggest = nors.shift();
        var smaller_sum = sum - biggest;

        if(smaller_sum == 0) {
            return [biggest].concat(get_nors(sum, nors));
        }

        var nors2 = get_nors(smaller_sum, nors)
            .map(function (one_of_nors) {
                return [biggest].concat(one_of_nors);
            });


        return nors2
            .concat(get_nors(sum, nors))
            .filter(function (array) {
                if(!(array instanceof Array)) {
                    console.log('arr', array);
                    debugger;
                }
                return array.reduce(function (a, b) {
                        return a + b
                    }, 0) == sum;
            });
    });

    nors = sort_nors(nors);
    return get_nors(sum, nors);
}

function get_red_of_too_big(nors, sum)
{
    return nors.filter(function(element){
        return element <= sum;
    });
}

function sort_nors(nors) {
    return nors.sort(function (a, b) {  return b - a;  });
}

function memoize(fn) {
    memoize.cache = {};
    return function() {
        var key = JSON.stringify(arguments);
        if(memoize.cache[key]) {
            return memoize.cache[key];
        }
        else {
            var val = fn.apply(this, arguments);
            memoize.cache[key] = val;
            return val;
        }
    };
}