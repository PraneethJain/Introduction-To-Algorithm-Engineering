#include <cstdlib>
#include <iostream>
#include <vector>

using Matrix = std::vector<std::vector<int>>;

Matrix generate_random_matrix(size_t n, size_t m)
{
  Matrix matrix(n, std::vector<int>(m));

  for (size_t i{0}; i < n; ++i)
  {
    for (size_t j{0}; j < m; ++j)
    {
      matrix[i][j] = std::rand();
    }
  }

  return matrix;
}

void print_matrix(const Matrix &matrix)
{
  size_t n{matrix.size()};
  size_t m{matrix[0].size()};

  for (int i{0}; i < n; ++i)
  {
    for (int j{0}; j < m; ++j)
    {
      std::cout << matrix[i][j] << "\t";
    }
    std::cout << std::endl;
  }
  std::cout << std::endl;
}

Matrix naive_transpose(const Matrix &matrix)
{
  size_t n{matrix.size()};
  size_t m{matrix[0].size()};

  Matrix transpose_matrix(m, std::vector<int>(n));

  for (int i{0}; i < n; ++i)
  {
    for (int j{0}; j < m; ++j)
    {
      transpose_matrix[j][i] = matrix[i][j];
    }
  }

  return transpose_matrix;
}

int main(int argc, char **argv)
{
  if (argc != 2)
  {
    std::cerr << "Usage: " << argv[0] << " <transpose_strategy>" << std::endl;
    return 1;
  }
  Matrix matrix{generate_random_matrix(2, 3)};
  print_matrix(matrix);

  Matrix transpose_matrix{naive_transpose(matrix)};
  print_matrix(transpose_matrix);

  return 0;
}
