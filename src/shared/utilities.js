 // value is a string or number, rules is an object
export const checkValidity = (value, rules, pass=null) => {

  let isValid = true;

  if (!rules) {

    return true;
  }

  if (rules.required) {

    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {

    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {

    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.confirmed) {

    isValid = value === pass && isValid;
  }

  if (rules.name || rules.country) {
    // regular match to VN unicode
    var re = /^\s?[ÁÀẢÃẠĂẮẶẰẲẴÂẤẦẨẪẬáàảãạăắặằẳẵâấầẩẫậađĐéèẻẽẹêếềểễệÉÈẺẼẸÊẾỀỂỄỆíìỉĩịÍÌỈĨỊóòỏõọôốồổỗộơớờởỡợÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢúùủũụưứừửữựÚÙỦŨỤƯỨỪỬỮỰýỳỷỹỵÝỲỶỸỴa-zA-Z]'?[- ÁÀẢÃẠĂẮẶẰẲẴÂẤẦẨẪẬáàảãạăắặằẳẵâấầẩẫậađĐéèẻẽẹêếềểễệÉÈẺẼẸÊẾỀỂỄỆíìỉĩịÍÌỈĨỊóòỏõọôốồổỗộơớờởỡợÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢúùủũụưứừửữựÚÙỦŨỤƯỨỪỬỮỰýỳỷỹỵÝỲỶỸỴa-zA-Z]+( [ÁÀẢÃẠĂẮẶẰẲẴÂẤẦẨẪẬáàảãạăắặằẳẵâấầẩẫậađĐéèẻẽẹêếềểễệÉÈẺẼẸÊẾỀỂỄỆíìỉĩịÍÌỈĨỊóòỏõọôốồổỗộơớờởỡợÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢúùủũụưứừửữựÚÙỦŨỤƯỨỪỬỮỰýỳỷỹỵÝỲỶỸỴa-zA-Z]+)*$/;

    isValid = re.test(String(value)) && isValid;

  }

  if (rules.email) {

      //Check valid email

      re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      isValid = re.test(String(value)) && isValid;
  }

  return isValid;

}
