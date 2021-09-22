** Blockchain (chain of Blocks)
Wiki: <https://vi.wikipedia.org/wiki/Blockchain>
Docs: <https://ethereum.org/vi/developers/docs/intro-to-ethereum/>

- Là một cơ sở dữ liệu công cộng, nơi nó luôn được updated và được shared với các máy tính (nút) ở trong mạng.
- Một "Block" trong "chain", thực tế là dữ liệu bao gồm thông tin về thời gian khởi tạo, mã thời gian, dữ liệu giao dịch được lưu trong các "khối" tuần tự, liên kết với "Block" khác qua mã hoá.
- Mã hoá được sinh ra dựa trên dữ liệu của khối, một khi thay đổi dữ liệu sẽ làm thay đổi các khối tiếp theo, việc này cần sự đồng thuận của toàn bộ mạng. Cơ chế đồng thuận trong mạng: Proof-of-work
- Blockchain được thiết kế để chống lại việc gian lận, thay đổi của dữ liệu: Một khi dữ liệu đã được mạng lưới chấp nhận thì sẽ không có cách nào thay đổi được nó.
- Các Block mới được phát tới mọi máy tính trong mạng, cập nhật trạng thái blockchain cho mọi người.
Khi gửi ETH,... giao dịch (transaction) phải được mined (đào, khai thác) và đưa vào 1 khối mới, chia sẻ với toàn bộ mạng.
- Blockchain được mở rộng theo thời gian

** Ethereum
Wiki: <https://vi.wikipedia.org/wiki/Ethereum>

- Ethereum: 1 nền tảng điện toán (môi trường thực thi) có tính chất phân tán, công cộng (ai cũng có thể truy tập), dựa trên công nghệ Blockchain. Nó có tính năng hợp đồng thông minh, tạo thuận lợi cho các thỏa thuận hợp đồng trực tuyến.
- Ethereum cũng cung cấp một loại tiền mã hóa gọi là "Ether" - ETH, có thể được chuyển giữa các tài khoản và được sử dụng để trả công cho các thợ đào giúp thực hiện việc tính toán.
- Bitcoin tạo ra như 1 loại tiền tệ, Ethereum được tạo ra như một nền tảng giao dịch hợp đồng thông minh.

** EVM (Ethereum Vitural Machine)

- Trong Ethereum universe, chỉ có 1 máy chuẩn duy nhất, mọi nodes trong mạng đều có 1 bản sao của máy này.
- Mọi node đều có thể gửi yêu cầu thực thi (transaction request) tới EVM. Transaction là trạng thái hoàn thành của transaction request và sự thay đổi trong EVM.
- Node có thể upload một đoạn mã tái sử dụng tới EVM, có thể gửi yêu cầu thực thi với tham số cần thiết. Thực thi mã thay đổi trạng thái trong EVM.

** Hợp đồng thông minh (Smart contract)

- Là một đoạn mã mang tính tái sử dụng, được upload lên bộ nhớ của EVM, thực thi khi có transaction request với tham số phù hợp.

** ETH

- Là native cryptoconcurrency của Ethereum

1. Metamask browser extension và cách sử dụng
Docs: <https://academy.binance.com/vi/articles/connecting-metamask-to-binance-smart-chain>

- Về Metamask extension:

- Extension cho phép kết nối tới  Ethereum enabled distributed applications ("Dapps").
- DApp (là tên gọi viết tắt của Decentralized Application), còn gọi là ứng dụng phi tập trung. Dapp được xây dựng trên nền tảng của Ethereum. Không như những ứng dụng tập trung thông thường khác, ứng dụng phi tập trung Dapp đã mở ra một kỷ nguyên mới cho việc bảo mật, giúp kết nối người dùng và nhà cung cấp một cách trực tiếp mà không cần sự có mặt của trung gian thứ 3.
- Cho phép tạo, quản lý danh tính cá nhân. Khi Dapp muốn thực hiện một giao dịch và ghi vào blockchain, người dùng sẽ nhận được một giao diện an toàn để xem xét giao dịch, trước khi chấp thuận hoặc từ chối nó.

2. Lên faucet lấy BNB token cho ví Binance Smart Chain testnet ở metmask
Docs: <https://academy.binance.com/vi/articles/connecting-metamask-to-binance-smart-chain>

- Thông tin network:
  Network name: Smart Chain - Testnet
  New RPC URL: <https://data-seed-prebsc-1-s1.binance.org:8545/>
  ChainID: 97
  Symbol: BNB
  Block Explorer URL: <https://testnet.bscscan.com>

- <https://testnet.binance.org/faucet-smart>

- Binance Chain Testnet hoàn toàn dành cho mục đích thử nghiệm cho cả người dùng và các đơn vị tạo ví.
- Tất cả các token trên testnet đều là các token thử nghiệm, không có giá trị tiền tệ hoặc sinh lợi nào gắn cùng. Các loại tiền trên Binance Chain Testnest không tương đương với các loại tiền trên Binance Chain Mainet hoặc của các tài khoản trên Binance.com.

3. ERC20 là gì
Docs: <https://ethereum.org/vi/developers/docs/standards/tokens/erc-20/>

- ERC là viết tắt của Ethereum Request for Comment 20. ERC-20 là một tiêu chuẩn kỹ thuật được sử dụng cho các hợp đồng thông minh trên Ethereum blockchain, để triển khai token applications có thể tương tác với ứng dụng và sản phẩm khác.
- Cung cấp các chức năng như
  - Chuyển token từ tài khoản này sang tài khoản khác.
  - Lấy số dư token của 1 tài khoản cũng nhưng cung cấp tổng nguồn cung token có sẵn trên mạng.

4. Tìm hiểu về thư viện web3-react.

- Abstracion dựa trên web3 js, xây dựng cho React.
- Là một state machine đảm bảo rằng những phần dữ liệu quan trọng liên quan đến dApp của bạn được cập nhật.
- Sử dụng Context API của React

5. Approve và Allowance

- Approve: đối chiếu giao dịch, giới hạn số lượng tokens có thể giao dịch.
- Allowance: cho phép kiểm tra số dư người dùng có thể rút.


**Token với native coin:
Docs: <https://blog.liquid.com/coin-vs-token>

- Native coin được xây dựng độc lập trên mạng lưới blockchain của chúng
  VD: Bitcoin (BTC), Ethereum (ETH), Binance Smart Chain (BNB)

  Vai trò: Chuyển giá trị tương tự như đồng tiền thực, thanh toán, chuyển khoản.

- Token đề cập đến các loại tiền điện tử không có mạng lưới blockchain của riêng mình, mà xây dựng trên mạng lưới blockchain khác. Thông dụng nhất là nền tảng Ethereum, và token ERC-20 phổ biến như USDT, USDC, DAI vì mạng lưới blockchain Ethereum dễ dàng cho phép tạo Token trên nền tảng của mình.

  Vai trò: Cho phép chuyển giá trị tương tự native coin. Tuy nhiên token tạo ra có mục đích cụ thể hơn là với chuyển giao giá trị.
  VD: Dịch vụ tạo ra token trên Ethereum và cho phép quy đổi, mua bán, tặng thưởng khi thanh toán bằng phương pháp truyền thống.

Docs: <https://ethereum.org/>
** EVM (Ethereum Vitural Machine)

- Trong Ethereum mạng lưới các nodes, chỉ có 1 máy chuẩn duy nhất, mọi nodes trong mạng đều có 1 bản sao của máy này.
- Mọi node đều có thể gửi yêu cầu thực thi (transaction request) tới EVM. Transaction là trạng thái hoàn thành của transaction request cùng với sự thay đổi của EVM.
- Node computer có thể upload một đoạn mã tái sử dụng tới EVM, có thể gửi yêu cầu thực thi với tham số cần thiết. Thực thi mã thay đổi trạng thái của EVM.

** Hợp đồng thông minh (Smart contract)

- Là một đoạn mã mang tính tái sử dụng, được upload lên bộ nhớ của EVM (có địa chỉ contract address)
- Thực thi khi có transaction request với tham số phù hợp.

** ETH

- Là native coin trong Ethereum.
- Động lực kinh tế, cung cấp phí cho các transaction request gửi từ các node cho các thợ đào thực hiện xác minh, tính toán và confirm với mạng lưới blockchain.

---------------------
** ETH and native coin

Khi người dùng muốn thực hiện một giao dịch, họ phải trả ether để giao dịch của họ được công nhận trên blockchain. Các chi phí sử dụng này được gọi là phí gas và chúng phụ thuộc vào tổng lượng điện toán yêu cầu của một giao dịch, cũng như nhu cầu tính toán trên toàn mạng khi giao dịch được gửi.

Minting (Đào) là một quá trình trong đó ether mới được tạo ra trên sổ cái Ethereum. Ether mới được tạo bởi giao thức Ethereum cơ bản và người dùng không thể tạo ether mới.

Ether được tạo ra khi một người khai thác tạo ra một khối trên chuỗi khối Ethereum. Như một động lực cho những người khai thác, giao thức trao phần thưởng trong mỗi khối, làm tăng số dư của một địa chỉ do người khai thác của khối đó đặt. Phần thưởng khối đã thay đổi theo thời gian và ngày nay là 2 ETH cho mỗi khối.

Mỗi giao dịch trong chuỗi khối Ethereum chứa một trường value, trường này sẽ chuyển một lượng ether được chỉ định, có giá trị bằng Wei, để gửi từ địa chỉ của người gửi đến địa chỉ của người nhận.

Khi địa chỉ người nhận là một hợp đồng thông minh , ether đã chuyển này có thể được sử dụng để thanh toán gas khi hợp đồng thông minh thực thi mã của nó.

Smart contracts – a dapp's backend vì không còn thuật ngữ nào tốt hơn ???.
