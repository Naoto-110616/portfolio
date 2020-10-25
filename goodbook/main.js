$(function(){

    const MSG_EMAIL_TYPE = 'Not in the form of email';
    const MSG_PHONE_TYPE = 'Not in the form of a phone number';
    const MSG_EMPTY = 'Input Required';
    const MSG_PASSWORD_MIN = 'Please enter at least 6 characters';

    $(".email").keyup(function(){

        var form_g = $(this).closest('.emaildiv');

        if($(this).val().length === 0){
            form_g.removeClass('has-success').addClass('has-error');
            form_g.find('.help-block').text(MSG_EMPTY);
        }else if($(this).val().length > 50 || !$(this).val().match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/) ){
            form_g.removeClass('has-success').addClass('has-error');
            form_g.find('.help-block').text(MSG_EMAIL_TYPE);
        }else{
            form_g.removeClass('has-error').addClass('has-success');
            form_g.find('.help-block').text('');
        }
    });

    $(".password").keyup(function(){

        var form_g = $(this).closest('.passworddiv');

        if($(this).val().length === 0){
            form_g.removeClass('has-success').addClass('has-error');
            form_g.find('.help-block').text(MSG_EMPTY);
        }else if($(this).val().length < 6){
            form_g.removeClass('has-success').addClass('has-error');
            form_g.find('.help-block').text(MSG_PASSWORD_MIN);
        }else{
            form_g.removeClass('has-error').addClass('has-success');
            form_g.find('.help-block').text('');
        }
    });
});
