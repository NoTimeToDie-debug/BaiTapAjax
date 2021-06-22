function Validation() {

    this.kiemTraRong = function (value,selectorError,name) {
        if(value.trim() === '') {
            document.querySelector(selectorError).innerHTML += name + ' không được bỏ trống !';
            return false;
        }

        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    this.kiemTraTatCaCacKyTu = function (value, selectorError, name) {
        var regexLetter = /^[A-Z a-z]+$/;
        if(regexLetter.test(value)) {
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }
        document.querySelector(selectorError).innerHTML +='('+ name + ' không hợp lệ!'+')';
        return false;
    }

    this.kiemTraTatCaSo = function (value, selectorError, name) {
        var regexNumber = /^[0-9]+$/;
        if(regexNumber.test(value)) {
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }
        document.querySelector(selectorError).innerHTML = name + ' phải nhập số! ';
        return false;
    }

    this.kiemTraDoDai = function (value, selectorError, minLength, maxLength, name) {
        if(value.trim().length < minLength || value.trim().length > maxLength) {
            document.querySelector(selectorError).innerHTML += '('+`${name} từ ${minLength} - ${maxLength} ký tự`+')';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    this.kiemTraGiaTri = function (value, selectorError, min, max, name) {
        if(value < min || value > max) {
            document.querySelector(selectorError).innerHTML +='('+ `${name} từ ${min} - ${max}`+')';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
}