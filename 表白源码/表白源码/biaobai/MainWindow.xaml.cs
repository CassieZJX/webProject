using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace biaobai
{
    /// <summary>
    /// MainWindow.xaml 的交互逻辑
    /// </summary>
    public partial class MainWindow : Window
    {
        String[] str = { "想要造反~" , "你想怎样~" , "你确定~" , "绝不后悔~" ,"你真的不要我么!"};
        int count = 0;
        public MainWindow()
        {
                 InitializeComponent();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            MessageBox.Show("抱起来~么么哒~");
            System.Environment.Exit(0);
        }

        private void Button_Click_1(object sender, RoutedEventArgs e)
        {
            MessageBox.Show(str[count]);
            count++;
            if (count == str.Count())
            {
                count = 0;
            }
        }

        protected override void OnClosing(System.ComponentModel.CancelEventArgs e)
        {
            MessageBox.Show("小哥哥~不同意是关不掉滴~");
            e.Cancel = true;
        }

    }
}
