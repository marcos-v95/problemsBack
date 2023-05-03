// File System
import fs from 'fs'

class ProductManager{

  constructor(path){
    this.path=path
    this.ID=1
  }

  async getProducts(){
    try {
      if(fs.existsSync (this.path)){
        let data= await fs.promises.readFile(this.path,'utf-8')
        let parseData=JSON.parse(data)

        return parseData

      }else{
        await fs.promises.writeFile(this.path,'[]')
        return []
      }
    }catch (error) {console.log(`Cannot read the file: --- ${error} ---`)}
  }

  async addProduct(product){
    try {
      let data= await this.getProducts()
      product.id=this.ID++
      data.push(product)
      await fs.promises.writeFile(this.path,JSON.stringify(data,null,'\t'));
      return data
    }catch (error) {console.log(`Cannot write the file: --- ${error} ---`)}
  }
  
  async getProductById(id){
    try {
      let data= await this.getProducts()
      let productID=data.find((product)=>product.id==id)

      if(productID){
        return productID
      }else{
        console.log('Error: Product not found')
      }

    } catch (error) {
      console.log(`There is an error: --- ${error} ---`)
    }
  }

  async updateProduct(id,product){
    try {
      let data=await this.getProducts()
      let indexToUpd= data.findIndex(p=>p.id==id)
      product.id=id
      data[indexToUpd]=product;

      return await fs.promises.writeFile(this.path,JSON.stringify(data,null,'\t'))

    } catch (error) {console.log(`There is an error: --- ${error} ---`)}
  }

  deleteProduct=async (id)=>{
    try {
      let data= await this.getProducts()
      let indexToDel= data.findIndex(p=>p.id===id)
      data.splice(indexToDel,1)

      return await fs.promises.writeFile(this.path,JSON.stringify(data,null,'\t'))

    } catch (error) {console.log(`There is an error: --- ${error} ---`)}
  }
}

export default ProductManager