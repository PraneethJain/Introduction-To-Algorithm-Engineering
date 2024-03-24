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

Matrix recursive_transpose(const Matrix &matrix)
{
  size_t n{matrix.size()};
  size_t m{matrix[0].size()};

  if (n == 1 || m == 1)
  {
    return naive_transpose(matrix);
  }

  Matrix transpose_matrix(m, std::vector<int>(n));
  Matrix a{}, b{};
  if (n > m)
  {
    a.assign(matrix.begin(), matrix.begin() + n / 2);
    b.assign(matrix.begin() + n / 2, matrix.end());
    Matrix a_transposed{recursive_transpose(a)}, b_transposed{recursive_transpose(b)};
    for (size_t j{0}; j < m; ++j)
    {
      std::copy(a_transposed[j].begin(), a_transposed[j].begin() + n / 2, transpose_matrix[j].begin());
      std::copy(b_transposed[j].begin(), b_transposed[j].end(), transpose_matrix[j].begin() + n / 2);
    }
  }
  else
  {
    for (size_t i{0}; i < n; ++i)
    {
      a.push_back(std::vector<int>(matrix[i].begin(), matrix[i].begin() + m / 2));
      b.push_back(std::vector<int>(matrix[i].begin() + m / 2, matrix[i].end()));
    }
    Matrix a_transposed{recursive_transpose(a)}, b_transposed{recursive_transpose(b)};
    transpose_matrix.assign(a_transposed.begin(), a_transposed.end());
    transpose_matrix.insert(transpose_matrix.end(), b_transposed.begin(), b_transposed.end());
  }

  return transpose_matrix;
}

int main(int argc, char **argv)
{
  // if (argc != 2)
  // {
  //   std::cerr << "Usage: " << argv[0] << " <transpose_strategy>" << std::endl;
  //   return 1;
  // }
  Matrix matrix{generate_random_matrix(5, 7)};
  print_matrix(matrix);

  Matrix transpose_matrix{recursive_transpose(matrix)};
  print_matrix(transpose_matrix);

  return 0;
}
