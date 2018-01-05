var len = 4
while (len--) {
  (
    function (len) {
      setTimeout(function () {
        console.error(len)
      }, 2000)
    }
  )(len)
  console.log(len)
  console.log('*'.repeat(20))
}
