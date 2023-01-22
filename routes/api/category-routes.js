const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
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

router.get('/:id', async (req, res) => {
  const results = await Category.findByPk(req.params.id, {
    include: Product
  })
  res.json(results)

  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  const newCategory = await Category.create(req.body);

  return res.json(newCategory);
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const newCategory = await Category.update(
    {
      id: req.body.id,
      category_name: req.body.category_name,

    },
    {
      where: {
        id: req.body.id,
      }
    })
  return res.json(newCategory)
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const newCategory = await Category.update(
    {
      id: req.body.id,
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.body.id
      }
    })
    return res.json(newCategory)
});

module.exports = router;