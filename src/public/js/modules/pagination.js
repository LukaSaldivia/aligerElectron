class Pagination{
  constructor( options = {
    arr : [],
    ePerPage : 15
  }){

    this.arr = options.arr || []
    this.ePerPage = options.ePerPage || 15
    this.page = 1
    this.query = ''

  } 

  getResults(){

    let arrF = this.arr.filter( e => Object.values(e).some(value => value.toLowerCase().includes(this.query)))
    let copy = JSON.parse(JSON.stringify(arrF))
    copy.length = this.page*this.ePerPage > arrF.length ? arrF.length : this.page*this.ePerPage;
    copy.splice(0,this.ePerPage*(this.page-1))
    
    return {
      results : copy,
      pagesCount : Math.ceil(arrF.length / this.ePerPage),
      total : arrF.length
    }

  }

  setQuery(txt = ''){
    this.query = txt.toLowerCase()
  }

  setPage(n = 1){
    this.page = Math.abs(Number(n)) > 0 ? Math.abs(Number(n)) : 1
  }
}