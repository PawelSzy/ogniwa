/**
 * Created by pawel on 20.10.17.
 */
$("#calculate_nors").click(function(e) {
    e.preventDefault();
    var nors = $("#nors_input")
        .val()
        .split(",")
        .map(function(elem){
            return parseInt(elem);
        });
    console.log(nors);

    var sum = parseInt($("#sum_input").val());
    var calculated_nors_table = calculate_nors(sum, nors);
    show_calculatated_nors(sum, nors, calculated_nors_table);
});

function show_calculatated_nors(sum, nors, calculated_nors_table) {

    console.log(calculated_nors_table);

    $("#table_of_ogniwa").empty();
    calculated_nors_table.forEach(function (calc_nors, index) {
        var nors_string = calc_nors.join();
        var closure_index = index;
        $("#table_of_ogniwa").append(function() {
            return $("<tr class='nors_row'  id='nors_row_'" + index + ">"
            + "<td>"
            + calc_nors.join(" + ")
            + " = " + sum
            + "</td></tr>"
            ).click(function() {
                console.log('index', index);
                var closure_index = index;
                $('#table_of_chosen_ogniwa').append($(this));

                console.log('nors_tab', calculated_nors_table.filter(function(elem, nor_index) {
                    return nor_index != closure_index;
                }));

                console.log('calc_nors', calc_nors);

                console.log('nors1', nors);    
                    
                calc_nors.forEach(function(nors_value){
                    console.log('nors_value', nors_value);
                    nors = delete_value_from_nors(nors, nors_value)
                });

                console.log('nors2', nors);
                console.log('sum', sum);
                console.log('nors_calc', calculate_nors(sum, nors));
                show_calculatated_nors(sum, nors, calculate_nors(sum, nors));
            })
        })
    });

    //$('.nors_row').unbind();
    //$('.nors_row').click(function () {
    //    $index$(this).attr('id');
    //});
}


function delete_value_from_nors(nors, value) {
    find_and_delete_from_array(value, nors);
    return nors;
}

function find_and_delete_from_array(value, arr) {
    index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    
    console.log('ind', arr);
}