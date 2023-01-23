const router = require('express').Router();
const { Category, Product } = require('../../models');

//find all categories and associated product data
router.get('/', async (req, res) => {
  try { 
    const results = await Category.findAll({
      include: Product,
    })

    res.json(results)}
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }  
});
//find one category and associated product data
router.get('/:id', async (req, res) => {
  const results = await Category.findByPk(req.params.id, {
    include: Product
  })

  res.json(results)
});
//create a new category
router.post('/', async (req, res) => {
  const newCategory = await Category.create(req.body);

  return res.json(newCategory);
});
//update a category by its `id` value
router.put('/:id', async (req, res) => {
  const newCategory = await Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  return res.json(newCategory)
});
// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  const newCategory = await Category.destroy({ where: {id: req.params.id}})
    return res.json(newCategory)
});

module.exports = router;