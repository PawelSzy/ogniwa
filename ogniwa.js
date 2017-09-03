/**
 * Created by pawel on 03.09.17.
 */

//
//var nors = [1414, 1590, 1520, 1630, 1609, 1482, 1581,
//    1576, 1667, 1956,
//    1608, 1446, 1428,
//    1620, 1690, 1574,
//    1508, 1627, 1557,
//    1967];

var nors = [4,5,3,2,17,12,9, 13, 6];


/*
 * @return array
 */
var memoization_table =[];

function get_nor(sum, nors)
{
    if(nors.length == 0)
    {
        return [];
    }

    if(nors.length == 1)
    {
        return nors[0] == sum ? nors : [] ;
    }


    if(nors.length == 2) {
        if(nors[0] + nors[1] == sum) {
            return nors;
        } else if(nors[0] == sum) {
            return [nors[0]];
        } else if(nors[1] == sum) {
            return [nors[1]];
        }
        else {
            return [];
        }
    }

    var nors = get_red_of_too_big(nors, sum);
    nors = sort_nors(nors);

    var biggest = nors.shift();
    var smaller_sum = sum - biggest;

    var filtered_nors = filter_who_can_be_sum(nors, sum, biggest);
    var smaller_solutions= get_nor(smaller_sum, filtered_nors);

    if(smaller_solutions.length > 0)
    {
        var solutions1 = smaller_solutions.map(function(solution) {
            return [biggest].concat(solution);
        });
    }
    else {
        return get_nor(sum,nors);
    }

    var solutions2 = get_nor(sum,nors);

    return solutions1.concat(solutions2);
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

function filter_who_can_be_sum(nors, sum, biggest)
{
    var biggest_elem = sum - biggest;
    return nors.filter(function(elem){
        return elem <= biggest_elem
    });
}


var sum = get_nor(15, nors);


console.log(sum);


